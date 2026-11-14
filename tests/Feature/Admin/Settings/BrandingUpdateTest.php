<?php

use App\Models\Administrator;
use App\Models\Customer;
use App\Models\SiteSetting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('administrators can see the default branding images', function () {
    $admin = Administrator::factory()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.branding.edit'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/settings/branding')
            ->where('site.branding.favicon.url', asset('site-favicon-placeholder.svg'))
            ->where('site.branding.favicon.customized', false)
            ->where('site.branding.main_logo.url', asset('site-logo-placeholder.svg'))
            ->where('site.branding.main_logo.customized', false));
});

test('customers cannot change site branding', function () {
    $customer = Customer::factory()->create();

    $this->actingAs($customer, 'store')
        ->put(route('admin.branding.update'), ['remove_favicon' => true])
        ->assertRedirect(route('admin.auth.login'));
});

test('a PNG branding image is served as WebP in the store', function (string $field, int $width, int $height, int $savedWidth, int $savedHeight) {
    Storage::fake('local');
    $admin = Administrator::factory()->create();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.branding.update'), [
            '_method' => 'PUT',
            $field => UploadedFile::fake()->image('branding.png', $width, $height),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.branding.edit'));

    $path = SiteSetting::value(SiteSetting::BRANDING[$field]['key']);
    expect(basename($path))->toStartWith(str_replace('_', '-', $field).'-')->toEndWith('.webp');
    $url = route('store.branding.asset', ['image' => $field, 'file' => basename($path)]);

    $response = $this->get($url)
        ->assertOk()
        ->assertHeader('Content-Type', 'image/webp');

    $size = getimagesizefromstring($response->streamedContent());
    expect([$size[0], $size[1], $size['mime']])->toBe([$savedWidth, $savedHeight, 'image/webp']);

    $home = $this->get(route('store.home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where("site.branding.{$field}.url", $url)
            ->where("site.branding.{$field}.customized", true));

    $home->assertSee('data-light="'.($field === 'favicon' ? $url : asset('site-favicon-placeholder.svg')).'"', false)
        ->assertSee('data-dark="'.($field === 'favicon_dark' ? $url : asset('site-favicon-placeholder.svg')).'"', false);
})->with([
    'recommended favicon' => ['favicon', 512, 512, 512, 512],
    'small favicon resized for the light theme' => ['favicon', 96, 96, 256, 256],
    'large favicon resized for the dark theme' => ['favicon_dark', 720, 720, 512, 512],
    'horizontal main logo' => ['main_logo', 900, 300, 900, 300],
    'horizontal dark logo' => ['main_logo_dark', 900, 300, 900, 300],
]);

test('SVG branding images are served without altering the uploaded content', function (string $field, string $viewBox) {
    Storage::fake('local');
    $admin = Administrator::factory()->create();
    $svg = <<<SVG
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="$viewBox">
            <rect width="100%" height="100%" fill="#222"/>
        </svg>
        SVG;

    $this->actingAs($admin, 'admin')
        ->post(route('admin.branding.update'), [
            '_method' => 'PUT',
            $field => UploadedFile::fake()->createWithContent('branding.svg', $svg),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.branding.edit'));

    $path = SiteSetting::value(SiteSetting::BRANDING[$field]['key']);
    expect(basename($path))->toStartWith(str_replace('_', '-', $field).'-')->toEndWith('.svg');

    $response = $this->get(route('store.branding.asset', ['image' => $field, 'file' => basename($path)]))
        ->assertOk()
        ->assertHeader('Content-Type', 'image/svg+xml');

    expect($response->streamedContent())->toBe($svg);
})->with([
    'square favicon' => ['favicon', '0 0 32 32'],
    'square dark favicon' => ['favicon_dark', '0 0 96.5 96.5'],
    'horizontal main logo' => ['main_logo', '0 0 300 100'],
]);

test('branding rejects incorrect formats and favicon dimensions', function (string $field, string $extension, string $format, int $size) {
    Storage::fake('local');
    $admin = Administrator::factory()->create();
    $file = UploadedFile::fake()->createWithContent(
        "branding.{$extension}",
        UploadedFile::fake()->image("branding.{$format}", $size, 512)->getContent(),
    );

    $this->actingAs($admin, 'admin')
        ->from(route('admin.branding.edit'))
        ->post(route('admin.branding.update'), ['_method' => 'PUT', $field => $file])
        ->assertSessionHasErrors($field)
        ->assertRedirect(route('admin.branding.edit'));

    expect(SiteSetting::value(SiteSetting::BRANDING[$field]['key']))->toBeNull();
})->with([
    'incorrect favicon dimensions' => ['favicon', 'png', 'png', 400],
    'incorrect dark favicon dimensions' => ['favicon_dark', 'png', 'png', 400],
    'incorrect PNG content for the favicon' => ['favicon', 'png', 'jpg', 512],
    'unsupported format for the main logo' => ['main_logo', 'jpg', 'jpg', 512],
    'incorrect SVG content for the main logo' => ['main_logo', 'svg', 'png', 512],
]);

test('a rectangular SVG cannot be used as a favicon', function () {
    $admin = Administrator::factory()->create();
    $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 32 32"/>';

    $this->actingAs($admin, 'admin')
        ->post(route('admin.branding.update'), [
            '_method' => 'PUT',
            'favicon' => UploadedFile::fake()->createWithContent('favicon.svg', $svg),
        ])
        ->assertSessionHasErrors(['favicon' => 'El favicon debe tener una proporción de 1:1.']);
});

test('removing a custom image restores the corresponding default', function (string $field, string $other, string $default) {
    Storage::fake('local');
    Storage::fake('public');
    $admin = Administrator::factory()->create();
    $paths = ['favicon' => 'site-settings/previous-icon.png', 'main_logo' => 'site-branding/logo.webp'];
    Storage::disk('public')->put($paths['favicon'], 'previous favicon');
    Storage::disk('local')->put($paths['main_logo'], 'main logo');

    SiteSetting::setMany([
        SiteSetting::KEY_FAVICON_PATH => $paths['favicon'],
        SiteSetting::KEY_MAIN_LOGO_PATH => $paths['main_logo'],
    ]);

    $this->actingAs($admin, 'admin')
        ->get(route('admin.branding.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('site.branding.favicon.url', Storage::disk('public')->url($paths['favicon'])));

    $this->put(route('admin.branding.update'), ['remove_'.$field => true])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.branding.edit'));

    $this->get(route('store.home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where("site.branding.{$field}.url", asset($default))
            ->where("site.branding.{$field}.customized", false)
            ->where("site.branding.{$other}.customized", true));

    Storage::disk($field === 'favicon' ? 'public' : 'local')->assertMissing($paths[$field]);
    Storage::disk($other === 'favicon' ? 'public' : 'local')->assertExists($paths[$other]);
})->with([
    'favicon' => ['favicon', 'main_logo', 'site-favicon-placeholder.svg'],
    'main logo' => ['main_logo', 'favicon', 'site-logo-placeholder.svg'],
]);

test('removing a dark variant restores its placeholder while keeping the custom light image', function (string $light, string $dark, string $default) {
    Storage::fake('local');
    $admin = Administrator::factory()->create();
    $lightPath = 'site-branding/light.webp';
    $darkPath = 'site-branding/dark.webp';
    Storage::disk('local')->put($lightPath, 'light image');
    Storage::disk('local')->put($darkPath, 'dark image');
    SiteSetting::setMany([
        SiteSetting::BRANDING[$light]['key'] => $lightPath,
        SiteSetting::BRANDING[$dark]['key'] => $darkPath,
    ]);

    $this->actingAs($admin, 'admin')
        ->put(route('admin.branding.update'), ['remove_'.$dark => true])
        ->assertSessionHasNoErrors();

    $lightUrl = route('store.branding.asset', ['image' => $light, 'file' => basename($lightPath)]);

    $this->get(route('store.home'))->assertInertia(fn (Assert $page) => $page
        ->where("site.branding.{$light}.url", $lightUrl)
        ->where("site.branding.{$dark}.url", asset($default))
        ->where("site.branding.{$dark}.customized", false));

    Storage::disk('local')->assertExists($lightPath);
    Storage::disk('local')->assertMissing($darkPath);
})->with([
    'favicon' => ['favicon', 'favicon_dark', 'site-favicon-placeholder.svg'],
    'main logo' => ['main_logo', 'main_logo_dark', 'site-logo-placeholder.svg'],
]);
