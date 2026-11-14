<?php

use App\Models\SiteSetting;
use Inertia\Testing\AssertableInertia as Assert;

test('store home page is displayed', function () {
    SiteSetting::setMany([SiteSetting::KEY_SITE_NAME => 'Moda & <Estilo>']);

    $response = $this->get(route('store.home'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('store/home/index'),
        );

    $this->assertMatchesRegularExpression('/<title\b[^>]*>Moda &amp; &lt;Estilo&gt;<\/title>/', $response->getContent());
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

test('store pages receive links for configured social networks and drop cleared profiles', function () {
    SiteSetting::setMany([
        'social_facebook' => 'marca.norte',
        'social_instagram' => 'marca_norte',
        'social_tiktok' => 'marca.norte',
        'social_x' => 'marca_norte',
        'social_youtube' => 'tiendañorte',
        'social_threads' => 'marca.norte',
        'social_linkedin' => 'marca-norte',
        'social_snapchat' => 'marca-norte',
        'social_pinterest' => 'marcanorte',
    ]);

    $this->get(route('store.home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->where('site.social_links', [
            'facebook' => 'https://facebook.com/marca.norte',
            'instagram' => 'https://instagram.com/marca_norte',
            'tiktok' => 'https://tiktok.com/@marca.norte',
            'x' => 'https://x.com/marca_norte',
            'youtube' => 'https://youtube.com/@tienda%C3%B1orte',
            'threads' => 'https://threads.com/@marca.norte',
            'linkedin' => 'https://linkedin.com/in/marca-norte',
            'snapchat' => 'https://snapchat.com/add/marca-norte',
            'pinterest' => 'https://pinterest.com/marcanorte',
        ]));

    SiteSetting::setMany(['social_linkedin_profile_type' => 'company', 'social_facebook' => null]);

    $this->get(route('store.home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->missing('site.social_links.facebook')
            ->where('site.social_links.linkedin', 'https://linkedin.com/company/marca-norte'));
});
