<?php

use App\Models\Administrator;
use App\Models\Customer;
use App\Models\SiteSetting;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    SiteSetting::setMany(SiteSetting::defaults());
});

afterEach(function () {
    SiteSetting::forgetCache();
});

test('information page is displayed to admins', function () {
    $user = Administrator::factory()
        ->create();

    $response = $this
        ->actingAs($user, 'admin')
        ->get(route('admin.information.edit'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/settings/information')
        ->has('settings'));
});

test('customers are redirected to the admin login page', function () {
    $customer = Customer::factory()
        ->create();

    $this
        ->actingAs($customer, 'store')
        ->get(route('admin.information.edit'))
        ->assertRedirect(route('admin.auth.login'));
});

test('site information can be updated', function () {
    $user = Administrator::factory()
        ->create();

    $response = $this
        ->actingAs($user, 'admin')
        ->from(route('admin.information.edit'))
        ->post(route('admin.information.update'), [
            '_method' => 'PUT',
            'site_name' => 'Tienda Norte',
            'site_description' => 'Texto descriptivo del sitio.',
            'site_keywords' => 'tienda, ecommerce, peru',
            'footer_credit_name' => 'Equipo Norte',
            'email' => 'hola@tiendanorte.com',
            'phone' => '987654321',
            'address' => 'Av. Principal 123',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.information.edit'));

    expect(SiteSetting::value(SiteSetting::KEY_SITE_NAME))->toBe('Tienda Norte')
        ->and(SiteSetting::value(SiteSetting::KEY_SITE_DESCRIPTION))->toBe('Texto descriptivo del sitio.')
        ->and(SiteSetting::value(SiteSetting::KEY_SITE_KEYWORDS))->toBe('tienda, ecommerce, peru')
        ->and(SiteSetting::value(SiteSetting::KEY_FOOTER_CREDIT_NAME))->toBe('Equipo Norte')
        ->and(SiteSetting::value(SiteSetting::KEY_EMAIL))->toBe('hola@tiendanorte.com')
        ->and(SiteSetting::value(SiteSetting::KEY_PHONE))->toBe('987654321')
        ->and(SiteSetting::value(SiteSetting::KEY_ADDRESS))->toBe('Av. Principal 123');
});
