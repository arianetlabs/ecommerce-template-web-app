<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BrandingAssetController extends Controller
{
    public function __invoke(string $image, string $file): StreamedResponse
    {
        $path = SiteSetting::BRANDING_DIRECTORY.'/'.$file;
        $disk = Storage::disk('local');

        abort_unless(SiteSetting::value(SiteSetting::BRANDING[$image]['key']) === $path && $disk->exists($path), 404);

        return $disk->response($path, $file, [
            'Content-Type' => str_ends_with($file, '.svg') ? 'image/svg+xml' : 'image/webp',
            'Content-Security-Policy' => "default-src 'none'; img-src data:; style-src 'unsafe-inline'; sandbox",
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
