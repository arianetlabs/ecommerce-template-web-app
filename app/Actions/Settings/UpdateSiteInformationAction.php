<?php

namespace App\Actions\Settings;

use App\Models\SiteSetting;

class UpdateSiteInformationAction
{
    /** @param array<string, mixed> $validated */
    public function handle(array $validated): void
    {
        $validated['site_keywords'] = $this->normalizeKeywords($validated['site_keywords']);

        SiteSetting::setMany($validated);
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
}
