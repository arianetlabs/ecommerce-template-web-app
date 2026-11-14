<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Actions\Settings\UpdateSiteBrandingAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\BrandingUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BrandingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/settings/branding');
    }

    public function update(BrandingUpdateRequest $request, UpdateSiteBrandingAction $updateSiteBranding): RedirectResponse
    {
        $updateSiteBranding->handle($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Se guardaron los cambios del logotipo del sitio.',
        ]);

        return to_route('admin.branding.edit');
    }
}
