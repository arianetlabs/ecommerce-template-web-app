<?php

namespace App\Actions\Settings;

use App\Models\SiteSetting;
use GdImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use League\Flysystem\UnableToWriteFile;
use Throwable;

class UpdateSiteBrandingAction
{
    /**
     * @param  array<string, UploadedFile|bool|int|string|null>  $validated
     */
    public function handle(array $validated): void
    {
        $settings = SiteSetting::values();
        $updated = [];

        try {
            foreach (SiteSetting::BRANDING as $name => $asset) {
                $file = $validated[$name] ?? null;

                if ($file instanceof UploadedFile) {
                    $updated[$asset['key']] = $this->storeImage($name, $file);
                } elseif ($validated['remove_'.$name] ?? false) {
                    $updated[$asset['key']] = null;
                }
            }

            if ($updated === []) {
                return;
            }

            SiteSetting::setMany($updated);
        } catch (Throwable $exception) {
            foreach (array_filter($updated) as $path) {
                $this->deleteImage($path);
            }

            throw $exception;
        }

        foreach ($updated as $key => $path) {
            $previousPath = $settings->get($key);

            if (filled($previousPath)) {
                $this->deleteImage($previousPath);
            }
        }
    }

    private function storeImage(string $name, UploadedFile $file): string
    {
        $isSvg = strtolower($file->getClientOriginalExtension()) === 'svg';
        $directory = SiteSetting::BRANDING_DIRECTORY;
        $filename = str_replace('_', '-', $name).'-'.bin2hex(random_bytes(6)).($isSvg ? '.svg' : '.webp');
        $disk = Storage::disk('local');

        if ($isSvg) {
            if ($disk->putFileAs($directory, $file, $filename) === false) {
                throw UnableToWriteFile::atLocation($directory.'/'.$filename);
            }

            return $directory.'/'.$filename;
        }

        $image = @imagecreatefrompng($file->getPathname());

        if ($image === false) {
            throw ValidationException::withMessages([$name => 'Selecciona una imagen PNG válida.']);
        }

        imagepalettetotruecolor($image);
        imagealphablending($image, false);
        imagesavealpha($image, true);

        if (str_starts_with($name, 'favicon')) {
            $image = $this->resizeFavicon($image, $name);
        }

        ob_start();

        try {
            $encoded = imagewebp($image, quality: 85);
            $contents = ob_get_contents();
        } finally {
            ob_end_clean();
        }

        $path = $directory.'/'.$filename;

        if (! $encoded || $contents === false || $contents === '' || ! $disk->put($path, $contents)) {
            throw UnableToWriteFile::atLocation($path);
        }

        return $path;
    }

    private function resizeFavicon(GdImage $image, string $name): GdImage
    {
        $width = imagesx($image);
        $size = $width < 512 ? 256 : 512;

        if ($width === $size) {
            return $image;
        }

        $resized = imagescale($image, $size, $size, IMG_BILINEAR_FIXED);

        if ($resized === false) {
            throw ValidationException::withMessages([$name => 'No se pudo redimensionar el favicon.']);
        }

        imagesavealpha($resized, true);

        return $resized;
    }

    private function deleteImage(string $path): void
    {
        if (str_starts_with($path, SiteSetting::BRANDING_DIRECTORY.'/')) {
            Storage::disk('local')->delete($path);
        } elseif (str_starts_with($path, 'site-settings/')) {
            Storage::disk('public')->delete($path);
        }
    }
}
