<?php

namespace App\Actions\Settings;

use App\Models\SiteSetting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\Flysystem\UnableToWriteFile;

class UpdateSiteInformationAction
{
    /** @param array<string, mixed> $validated */
    public function handle(array $validated, ?UploadedFile $logo): void
    {
        $removeLogo = (bool) ($validated['remove_logo'] ?? false);
        $currentLogoPath = SiteSetting::value(SiteSetting::KEY_LOGO_PATH);

        unset($validated['logo'], $validated['remove_logo']);
        $validated['site_keywords'] = $this->normalizeKeywords($validated['site_keywords']);

        if ($logo instanceof UploadedFile) {
            $validated[SiteSetting::KEY_LOGO_PATH] = $this->storeLogo($logo);
        } elseif ($removeLogo) {
            $validated[SiteSetting::KEY_LOGO_PATH] = null;
        }

        SiteSetting::setMany($validated);

        if (($logo instanceof UploadedFile || $removeLogo) && filled($currentLogoPath)) {
            Storage::disk('public')->delete($currentLogoPath);
        }
    }

    /**
     * Normalize the comma-separated keywords string.
     */
    private function normalizeKeywords(string $keywords): string
    {
        return collect(explode(',', $keywords))
            ->map(static fn (string $keyword): string => trim($keyword))
            ->filter()
            ->implode(', ');
    }

    /**
     * Store the uploaded logo on the public disk.
     */
    private function storeLogo(UploadedFile $logo): string
    {
        $extension = strtolower((string) ($logo->getClientOriginalExtension() ?: $logo->extension() ?: 'png'));
        $fileName = Str::uuid()->toString().'.'.$extension;

        $path = $logo->storePubliclyAs('site-settings', $fileName, 'public');

        if ($path === false) {
            throw UnableToWriteFile::atLocation('site-settings/'.$fileName);
        }

        return $path;
    }
}
