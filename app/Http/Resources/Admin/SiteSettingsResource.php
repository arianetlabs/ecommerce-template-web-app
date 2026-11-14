<?php

namespace App\Http\Resources\Admin;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SiteSettingsResource extends JsonResource
{
    /**
     * @param  array<int, array{key: string, value: string|null}>  $resource
     */
    public function __construct(array $resource)
    {
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $settings = array_column($this->resource, 'value', 'key');

        $values = collect(SiteSetting::defaults())->mapWithKeys(
            fn (mixed $default, string $key): array => [
                $key => array_key_exists($key, $settings) ? $settings[$key] : $default,
            ],
        );

        $branding = [];

        foreach (SiteSetting::BRANDING as $name => $image) {
            $path = $values->get($image['key']);
            $defaultUrl = asset($image['default']);
            $url = match (true) {
                blank($path) => $defaultUrl,
                str_starts_with($path, SiteSetting::BRANDING_DIRECTORY.'/') => route('store.branding.asset', [
                    'image' => $name,
                    'file' => basename($path),
                ]),
                default => Storage::disk('public')->url($path),
            };

            $branding[$name] = [
                'url' => $url,
                'default_url' => $defaultUrl,
                'customized' => filled($path),
            ];
        }

        $socialLinks = [];
        $socialPrefixes = SiteSetting::SOCIAL_NETWORK_PREFIXES;

        if (($settings[SiteSetting::SOCIAL_NETWORK_PREFIX.'linkedin_profile_type'] ?? null) === 'company') {
            $socialPrefixes['linkedin'] = SiteSetting::LINKEDIN_COMPANY_PREFIX;
        }

        foreach ($socialPrefixes as $network => $prefix) {
            $username = $settings[SiteSetting::SOCIAL_NETWORK_PREFIX.$network] ?? null;

            if (filled($username)) {
                $socialLinks[$network] = 'https://'.$prefix.rawurlencode($username);
            }
        }

        return [
            'branding' => $branding,
            'social_links' => (object) $socialLinks,
            'site_name' => (string) $values->get(SiteSetting::KEY_SITE_NAME, config('app.name')),
            'site_description' => (string) $values->get(SiteSetting::KEY_SITE_DESCRIPTION, ''),
            'site_keywords' => (string) $values->get(SiteSetting::KEY_SITE_KEYWORDS, ''),
            'footer_credit_name' => (string) $values->get(SiteSetting::KEY_FOOTER_CREDIT_NAME, config('app.name')),
            'email' => (string) $values->get(SiteSetting::KEY_EMAIL, ''),
            'phone' => (string) $values->get(SiteSetting::KEY_PHONE, ''),
            'address' => (string) $values->get(SiteSetting::KEY_ADDRESS, ''),
        ];
    }
}
