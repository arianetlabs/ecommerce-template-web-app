<?php

namespace App\Actions\Settings;

use App\Models\SiteSetting;

class UpdateSiteSocialNetworksAction
{
    /** @param array<string, string|null> $validated */
    public function handle(array $validated): void
    {
        $settings = [];

        foreach ($validated as $key => $value) {
            $settings[SiteSetting::SOCIAL_NETWORK_PREFIX.$key] = $value;
        }

        SiteSetting::setMany($settings);
    }
}
