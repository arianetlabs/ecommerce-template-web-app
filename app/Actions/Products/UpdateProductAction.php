<?php

namespace App\Actions\Products;

use App\Exceptions\ProductImageProcessingException;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class UpdateProductAction
{
    public function __construct(
        private ProcessProductImageAction $processProductImage,
        private SanitizeProductDescriptionAction $sanitizeDescription,
    ) {}

    /**
     * @param  array<string, mixed>  $validated
     */
    public function handle(Product $product, array $validated): Product
    {
        $createdImages = [];
        $archivedPaths = [];
        $renamedPaths = [];

        try {
            $updatedProduct = DB::transaction(function () use ($product, $validated, &$createdImages, &$archivedPaths, &$renamedPaths): Product {
                $lockedProduct = Product::query()->lockForUpdate()->findOrFail($product->id);
                $slots = Arr::pull($validated, 'images', []);
                $isDraft = (bool) Arr::pull($validated, 'is_draft', false);
                $validated['description'] = $this->sanitizeDescription->handle(
                    is_string($validated['description'] ?? null) ? $validated['description'] : null,
                );
                $validated['published_at'] = $isDraft ? null : ($lockedProduct->published_at ?? now());

                /** @var Collection<string, ProductImage> $existingImages */
                $existingImages = $lockedProduct->images()->get()->keyBy(fn (ProductImage $image): string => $image->id);
                $retainedIds = [];

                foreach ($slots as $slot) {
                    $existingId = is_array($slot) ? ($slot['id'] ?? null) : null;

                    if (is_string($existingId)) {
                        $retainedIds[] = $existingId;
                    }
                }

                $imagesToDelete = $existingImages->reject(
                    fn (ProductImage $image): bool => in_array($image->id, $retainedIds, true),
                );

                foreach ($imagesToDelete as $image) {
                    foreach ($this->pathsForImage($image) as $path) {
                        $this->archivePath($path, $archivedPaths, allowMissing: true);
                    }

                    $image->delete();
                }

                /**
                 * @var array<string, array{
                 *     paths: array{path: string, variants: array<string, string>},
                 *     moves: array<int, array{temporary: string, destination: string}>
                 * }> $renamesByImage
                 */
                $renamesByImage = [];

                foreach ($slots as $position => $slot) {
                    $existingId = is_array($slot) ? ($slot['id'] ?? null) : null;

                    if (! is_string($existingId)) {
                        continue;
                    }

                    $existingImage = $existingImages->get($existingId);

                    if (! $existingImage instanceof ProductImage) {
                        throw new ProductImageProcessingException('No se pudo encontrar una imagen existente del producto.');
                    }

                    $currentPaths = $this->databasePathsForImage($existingImage);
                    $configuredPaths = $this->processProductImage->pathsForPosition($lockedProduct, $position);
                    $destinationPaths = [
                        'path' => $configuredPaths['path'],
                        'variants' => [],
                    ];

                    foreach ($currentPaths['variants'] as $variant => $currentPath) {
                        $destinationPaths['variants'][$variant] = $configuredPaths['variants'][$variant] ?? $currentPath;
                    }

                    if ($currentPaths === $destinationPaths) {
                        continue;
                    }

                    $pathPairs = [[
                        'original' => $currentPaths['path'],
                        'destination' => $destinationPaths['path'],
                    ]];

                    foreach ($currentPaths['variants'] as $variant => $currentPath) {
                        $pathPairs[] = [
                            'original' => $currentPath,
                            'destination' => $destinationPaths['variants'][$variant],
                        ];
                    }

                    $moves = [];

                    foreach ($pathPairs as $pathPair) {
                        $temporaryPath = $this->archivePath($pathPair['original'], $archivedPaths);
                        $moves[] = [
                            'temporary' => $temporaryPath,
                            'destination' => $pathPair['destination'],
                        ];
                    }

                    $renamesByImage[$existingId] = [
                        'paths' => $destinationPaths,
                        'moves' => $moves,
                    ];
                }

                $temporaryPosition = 65535;

                foreach ($existingImages->except($imagesToDelete->keys()->all()) as $image) {
                    while ($existingImages->contains(fn (ProductImage $candidate): bool => $candidate->position === $temporaryPosition)) {
                        $temporaryPosition--;
                    }

                    $image->update(['position' => $temporaryPosition]);
                    $temporaryPosition--;
                }

                $lockedProduct->update($validated);

                foreach ($slots as $position => $slot) {
                    if (! is_array($slot)) {
                        continue;
                    }

                    $existingId = $slot['id'] ?? null;

                    if (is_string($existingId)) {
                        $existingImage = $existingImages->get($existingId);

                        if (! $existingImage instanceof ProductImage) {
                            throw new ProductImageProcessingException('No se pudo encontrar una imagen existente del producto.');
                        }

                        $updatedImage = [
                            'alt' => $lockedProduct->name,
                            'position' => $position,
                        ];
                        $rename = $renamesByImage[$existingId] ?? null;

                        if (is_array($rename)) {
                            foreach ($rename['moves'] as $move) {
                                if (! Storage::disk('public')->move($move['temporary'], $move['destination'])) {
                                    throw new ProductImageProcessingException('No se pudo renombrar una imagen reordenada.');
                                }

                                $renamedPaths[$move['destination']] = $move['temporary'];
                            }

                            $updatedImage['path'] = $rename['paths']['path'];
                            $updatedImage['variants'] = $rename['paths']['variants'];
                        }

                        $existingImage->update($updatedImage);

                        continue;
                    }

                    $uploadedImage = $slot['file'] ?? null;

                    if ($uploadedImage instanceof UploadedFile) {
                        $createdImages[] = $this->processProductImage->handle($uploadedImage, $lockedProduct, $position);
                    }
                }

                return $lockedProduct;
            });
        } catch (Throwable $exception) {
            foreach ($createdImages as $createdImage) {
                Storage::disk('public')->delete($this->pathsForImage($createdImage));
            }

            foreach ($renamedPaths as $renamedPath => $temporaryPath) {
                if (Storage::disk('public')->exists($renamedPath)) {
                    Storage::disk('public')->move($renamedPath, $temporaryPath);
                }
            }

            foreach ($archivedPaths as $archivedPath => $originalPath) {
                if (Storage::disk('public')->exists($archivedPath)) {
                    Storage::disk('public')->move($archivedPath, $originalPath);
                }
            }

            throw $exception;
        }

        Storage::disk('public')->delete(array_keys($archivedPaths));

        return $updatedProduct->refresh();
    }

    /** @return array<int, string> */
    private function pathsForImage(ProductImage $image): array
    {
        $variants = $image->getAttribute('variants');
        $variantPaths = is_array($variants) ? array_values(array_filter($variants, 'is_string')) : [];

        return [$image->path, ...$variantPaths];
    }

    /**
     * @param  array<string, string>  $archivedPaths
     */
    private function archivePath(string $path, array &$archivedPaths, bool $allowMissing = false): string
    {
        if (! Storage::disk('public')->exists($path)) {
            if ($allowMissing) {
                return $path;
            }

            throw new ProductImageProcessingException('No se pudo encontrar una variante de imagen para reordenarla.');
        }

        $archivedPath = $path.'.pending-change-'.Str::lower((string) Str::ulid());

        if (! Storage::disk('public')->move($path, $archivedPath)) {
            throw new ProductImageProcessingException('No se pudo preparar una imagen para cambiar su posición.');
        }

        $archivedPaths[$archivedPath] = $path;

        return $archivedPath;
    }

    /** @return array{path: string, variants: array<string, string>} */
    private function databasePathsForImage(ProductImage $image): array
    {
        $variants = $image->getAttribute('variants');

        return [
            'path' => $image->path,
            'variants' => is_array($variants) ? array_filter($variants, 'is_string') : [],
        ];
    }
}
