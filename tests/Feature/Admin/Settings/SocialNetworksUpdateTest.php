<?php

use App\Models\Administrator;
use App\Models\Customer;
use App\Models\SiteSetting;
use Inertia\Testing\AssertableInertia as Assert;

afterEach(function () {
    SiteSetting::forgetCache();
});

test('administrators can open social network settings before any profiles are configured', function () {
    $admin = Administrator::factory()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.social-networks.edit'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/settings/social-networks')
            ->where('settings.linkedin_profile_type', 'personal')
            ->where('settings.linkedin', '')
            ->where('settings.facebook', ''));
});

test('customers cannot change the site social networks', function () {
    $customer = Customer::factory()->create();

    $this->actingAs($customer, 'store')
        ->put(route('admin.social-networks.update'), ['facebook' => 'marca', 'linkedin_profile_type' => 'personal'])
        ->assertRedirect(route('admin.auth.login'));

    $this->assertDatabaseMissing('site_settings', ['key' => 'social_facebook']);
});

test('administrators can save social usernames and clear an existing username', function () {
    $admin = Administrator::factory()->create();
    SiteSetting::setMany(['social_snapchat' => 'old-brand', 'site_name' => 'Tienda Norte']);

    $this->actingAs($admin, 'admin')
        ->put(route('admin.social-networks.update'), [
            'facebook' => 'marca.norte',
            'instagram' => 'marca_norte',
            'tiktok' => 'marca.norte',
            'x' => 'marca_norte',
            'youtube' => 'marcanorte',
            'threads' => 'marca.norte',
            'linkedin' => 'marca-norte',
            'linkedin_profile_type' => 'company',
            'snapchat' => '',
            'pinterest' => 'marcanorte',
            'site_name' => 'Otro nombre',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.social-networks.edit'));

    $this->get(route('admin.social-networks.edit'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->where('settings', [
            'facebook' => 'marca.norte',
            'instagram' => 'marca_norte',
            'tiktok' => 'marca.norte',
            'x' => 'marca_norte',
            'youtube' => 'marcanorte',
            'threads' => 'marca.norte',
            'linkedin' => 'marca-norte',
            'snapchat' => '',
            'pinterest' => 'marcanorte',
            'linkedin_profile_type' => 'company',
        ]));

    $this->assertDatabaseHas('site_settings', ['key' => 'site_name', 'value' => 'Tienda Norte']);
    $this->assertDatabaseHas('site_settings', ['key' => 'social_snapchat', 'value' => null]);
});

test('invalid usernames and LinkedIn profile types are rejected without saving', function () {
    $admin = Administrator::factory()->create();
    SiteSetting::setMany(['social_instagram' => 'marca_norte']);

    $this->actingAs($admin, 'admin')
        ->put(route('admin.social-networks.update'), [
            'instagram' => 'https://instagram.com/otra_marca',
            'tiktok' => '@marca',
            'x' => 'marca norte',
            'linkedin_profile_type' => 'invalid',
        ])
        ->assertSessionHasErrors([
            'instagram' => 'Ingresa solo el nombre de usuario, sin @, espacios ni enlace.',
            'tiktok',
            'x',
            'linkedin_profile_type' => 'Selecciona Perfil personal o Empresa para LinkedIn.',
        ]);

    $this->assertDatabaseHas('site_settings', ['key' => 'social_instagram', 'value' => 'marca_norte']);
});
