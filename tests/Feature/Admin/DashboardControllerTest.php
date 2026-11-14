<?php

use App\Models\Administrator;
use App\Models\SiteSetting;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the admin login page when accessing dashboard', function () {
    $response = $this->get(route('admin.dashboard'));

    $response->assertRedirect(route('admin.auth.login'));
});

test('admins can visit the dashboard', function () {
    SiteSetting::setMany([SiteSetting::KEY_SITE_NAME => 'Tienda Norte']);
    $user = Administrator::factory()
        ->create();
    $this->actingAs($user, 'admin');

    $response = $this->get(route('admin.dashboard'));
    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard/index')
            ->where('auth.user.id', $user->id)
            ->where('auth.user.name', $user->name)
            ->where('auth.user.last_name', $user->last_name)
            ->missing('auth.user.document_type')
            ->missing('auth.user.document_number')
            ->where('auth.user.role.value', $user->role->value)
            ->where('auth.user.role.label', $user->role->label())
        );

    $this->assertMatchesRegularExpression('/<title\b[^>]*>Administración Tienda Norte<\/title>/', $response->getContent());
});
