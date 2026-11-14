<?php

namespace App\Http\Requests\Admin\Settings;

use App\Models\SiteSetting;
use Closure;
use DOMDocument;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class BrandingUpdateRequest extends FormRequest
{
    /**
     * @return array<string, list<string|Closure>>
     */
    public function rules(): array
    {
        $rules = [];

        foreach (array_keys(SiteSetting::BRANDING) as $name) {
            $rules[$name] = ['bail', 'nullable', 'file', 'max:2048', $this->imageRule(isFavicon: str_starts_with($name, 'favicon'))];
            $rules['remove_'.$name] = ['sometimes', 'boolean'];
        }

        return $rules;
    }

    private function imageRule(bool $isFavicon): Closure
    {
        return function (string $attribute, UploadedFile $file, Closure $fail) use ($isFavicon): void {
            match (strtolower($file->getClientOriginalExtension())) {
                'png' => $this->validatePng($file, $isFavicon, $fail),
                'svg' => $this->validateSvg($file, $isFavicon, $fail),
                default => $fail('Selecciona una imagen PNG o SVG.'),
            };
        };
    }

    private function validatePng(UploadedFile $file, bool $isFavicon, Closure $fail): void
    {
        $size = @getimagesize($file->getPathname());

        if ($size === false || $size[2] !== IMAGETYPE_PNG || $size[0] < 1 || $size[1] < 1) {
            $fail('Selecciona una imagen PNG válida.');

            return;
        }

        if ($isFavicon && $size[0] !== $size[1]) {
            $fail('El favicon debe tener una proporción de 1:1.');
        } elseif ($size[0] > 4096 || $size[1] > 4096) {
            $fail('La imagen PNG no debe superar los 4096 px por lado.');
        }
    }

    private function validateSvg(UploadedFile $file, bool $isFavicon, Closure $fail): void
    {
        $document = new DOMDocument;

        if (! @$document->loadXML($file->getContent(), LIBXML_NONET)) {
            $fail('Selecciona una imagen SVG válida.');

            return;
        }

        $svg = $document->documentElement;

        if ($svg === null || $svg->localName !== 'svg' || $svg->namespaceURI !== 'http://www.w3.org/2000/svg' || $document->doctype !== null) {
            $fail('Selecciona una imagen SVG válida.');

            return;
        }

        if (! $isFavicon) {
            return;
        }

        $width = $this->svgLengthInPixels($svg->getAttribute('width'));
        $height = $this->svgLengthInPixels($svg->getAttribute('height'));
        $viewBox = preg_split('/[\s,]+/', trim($svg->getAttribute('viewBox')));
        $hasSquareViewBox = $viewBox !== false && count($viewBox) === 4
            && count(array_filter($viewBox, is_numeric(...))) === 4
            && is_finite((float) $viewBox[2]) && (float) $viewBox[2] > 0
            && (float) $viewBox[2] === (float) $viewBox[3];

        $isSquare = $width !== null && $height !== null
            ? $width > 0 && $height > 0 && is_finite($width) && is_finite($height) && abs($width - $height) <= $width * 1e-9
            : $hasSquareViewBox;

        if (! $isSquare) {
            $fail('El favicon debe tener una proporción de 1:1.');
        }
    }

    private function svgLengthInPixels(string $length): ?float
    {
        if (! preg_match('/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(px|in|cm|mm|q|pt|pc)?$/i', trim($length), $matches)) {
            return null;
        }

        return (float) $matches[1] * match (strtolower($matches[2] ?? '')) {
            'in' => 96,
            'cm' => 96 / 2.54,
            'mm' => 96 / 25.4,
            'q' => 96 / 101.6,
            'pt' => 96 / 72,
            'pc' => 16,
            default => 1,
        };
    }
}
