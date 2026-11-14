<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Actions\Settings\UpdateSiteInformationAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\InformationUpdateRequest;
use App\Http\Resources\Admin\SiteSettingsResource;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InformationController extends Controller
{
    /**
     * Show the site information form.
     */
    public function edit(): Response
    {
        $settings = SiteSettingsResource::make(SiteSetting::cachedRows())->resolve();

        return Inertia::render('admin/settings/information', ['settings' => $settings]);
    }

    /**
     * Update the site information.
     */
    public function update(InformationUpdateRequest $request, UpdateSiteInformationAction $updateSiteInformation): RedirectResponse
    {
        $validated = $request->validated();
        $logo = $request->file('logo');
        $updateSiteInformation->handle($validated, $logo);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Site information updated.'),
        ]);

        return to_route('admin.information.edit');
    }
}
