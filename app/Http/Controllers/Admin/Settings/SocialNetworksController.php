<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Actions\Settings\UpdateSiteSocialNetworksAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\SocialNetworksUpdateRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SocialNetworksController extends Controller
{
    public function edit(): Response
    {
        $stored = SiteSetting::values();
        $usernames = [];

        foreach (array_keys(SiteSetting::SOCIAL_NETWORK_PREFIXES) as $network) {
            $usernames[$network] = (string) $stored->get(SiteSetting::SOCIAL_NETWORK_PREFIX.$network);
        }

        return Inertia::render('admin/settings/social-networks', [
            'settings' => [
                ...$usernames,
                'linkedin_profile_type' => $stored->get(SiteSetting::SOCIAL_NETWORK_PREFIX.'linkedin_profile_type', 'personal'),
            ],
            'prefixes' => SiteSetting::SOCIAL_NETWORK_PREFIXES,
            'linkedinCompanyPrefix' => SiteSetting::LINKEDIN_COMPANY_PREFIX,
        ]);
    }

    public function update(SocialNetworksUpdateRequest $request, UpdateSiteSocialNetworksAction $updateSocialNetworks): RedirectResponse
    {
        $updateSocialNetworks->handle($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Se guardaron los cambios de redes sociales.',
        ]);

        return to_route('admin.social-networks.edit');
    }
}
