<?php

use App\Models\SiteSetting;
use Inertia\Testing\AssertableInertia as Assert;

test('store home page is displayed', function () {
    $this->get(route('store.home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('store/home/index'),
        );
});

test('store pages receive the current site information after settings are updated', function () {
    SiteSetting::setMany([
        SiteSetting::KEY_SITE_DESCRIPTION => 'Descripción anterior',
        SiteSetting::KEY_FOOTER_CREDIT_NAME => 'Equipo Norte',
        SiteSetting::KEY_EMAIL => 'hola@tiendanorte.com',
        SiteSetting::KEY_PHONE => '987654321',
        SiteSetting::KEY_ADDRESS => 'Av. Principal 123',
    ]);

    $this->get(route('store.home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('site.site_description', 'Descripción anterior'));

    SiteSetting::setMany([SiteSetting::KEY_SITE_DESCRIPTION => 'Moda para todos los días']);

    $this->get(route('store.auth.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('site.site_description', 'Moda para todos los días')
            ->where('site.footer_credit_name', 'Equipo Norte')
            ->where('site.email', 'hola@tiendanorte.com')
            ->where('site.phone', '987654321')
            ->where('site.address', 'Av. Principal 123'));
});
