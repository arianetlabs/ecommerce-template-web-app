<?php

use App\Models\Administrator;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the admin login page when accessing categories index', function () {
    $response = $this->get(route('admin.categories.index'));

    $response->assertRedirect(route('admin.auth.login'));
});

test('admins can see only root categories and parent options', function () {
    $admin = Administrator::factory()
        ->create();

    $rootCategory = Category::factory()
        ->create(['name' => 'Hogar']);

    $childCategory = Category::factory()
        ->forParent($rootCategory)
        ->create(['name' => 'Decoración']);

    $anotherRootCategory = Category::factory()
        ->create(['name' => 'Tecnología']);

    $this->actingAs($admin, 'admin')
        ->get(route('admin.categories.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/categories/index')
            ->where('parent_category', null)
            ->has('categories.data', 2)
            ->has('category_parent_options', 3)
            ->where('categories.data.0.name', 'Hogar')
            ->where('categories.data.0.parent', null)
            ->where('categories.data.1.name', 'Tecnología')
            ->where('categories.data.1.parent', null)
            ->missing('categories.data.2'),
        );

    expect($childCategory->refresh()->parent_id)->toBe($rootCategory->id)
        ->and($anotherRootCategory->refresh()->parent_id)->toBeNull();
});

test('admins can see the subcategories of a category and its parent is preselected', function () {
    $admin = Administrator::factory()
        ->create();

    $rootCategory = Category::factory()
        ->create(['name' => 'Tecnología']);

    $firstChild = Category::factory()
        ->forParent($rootCategory)
        ->create(['name' => 'Accesorios']);

    $secondChild = Category::factory()
        ->forParent($rootCategory)
        ->create(['name' => 'Laptops']);

    Category::factory()
        ->create(['name' => 'Hogar']);

    $this->actingAs($admin, 'admin')
        ->get(route('admin.categories.subcategories', $rootCategory))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/categories/index')
            ->where('parent_category.name', $rootCategory->name)
            ->has('categories.data', 2)
            ->has('category_parent_options', 4)
            ->where('categories.data.0.name', 'Accesorios')
            ->where('categories.data.0.parent.id', $rootCategory->id)
            ->where('categories.data.1.name', 'Laptops')
            ->where('categories.data.1.parent.id', $rootCategory->id)
            ->missing('categories.data.2'),
        );

    expect($firstChild->refresh()->parent_id)->toBe($rootCategory->id)
        ->and($secondChild->refresh()->parent_id)->toBe($rootCategory->id);
});

test('admins can create a root category with generated slug and code', function () {
    $admin = Administrator::factory()
        ->create();

    $response = $this->actingAs($admin, 'admin')
        ->post(route('admin.categories.store'), [
            'name' => 'Moda Hombre',
            'parent_id' => '__root__',
            'short_description' => 'Ropa masculina',
        ]);

    $response->assertRedirect(route('admin.categories.index'));
    $response->assertInertiaFlash('toast.type', 'success');
    $response->assertInertiaFlash('toast.message', __('actions.categories.created'));

    $category = Category::query()
        ->where('name', 'Moda Hombre')
        ->firstOrFail();

    expect($category->slug)->toBe('moda-hombre')
        ->and($category->code)->toMatch('/^CA[A-Z0-9]{4}$/')
        ->and($category->is_active)->toBeTrue()
        ->and($category->parent_id)->toBeNull();
});

test('admins can create a subcategory and return to its parent listing', function () {
    $admin = Administrator::factory()
        ->create();

    $parentCategory = Category::factory()
        ->create(['name' => 'Tecnología']);

    $response = $this->actingAs($admin, 'admin')
        ->post(route('admin.categories.store'), [
            'name' => 'Periféricos',
            'parent_id' => $parentCategory->id,
            'short_description' => 'Accesorios para equipo',
        ]);

    $response->assertRedirect(route('admin.categories.subcategories', $parentCategory));
    $response->assertInertiaFlash('toast.type', 'success');
    $response->assertInertiaFlash('toast.message', __('actions.categories.created'));

    $category = Category::query()
        ->where('name', 'Periféricos')
        ->firstOrFail();

    expect($category->parent_id)->toBe($parentCategory->id)
        ->and($category->is_active)->toBeTrue();
});

test('admins must provide a valid category name when creating categories', function () {
    $admin = Administrator::factory()
        ->create();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.categories.store'), [
            'name' => '',
            'parent_id' => '__root__',
            'short_description' => 'Ropa masculina',
        ])
        ->assertSessionHasErrors('name');
});

test('admins must keep category short descriptions within the configured limit', function () {
    $admin = Administrator::factory()
        ->create();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.categories.store'), [
            'name' => 'Moda Hombre',
            'parent_id' => '__root__',
            'short_description' => str_repeat('a', 129),
        ])
        ->assertSessionHasErrors('short_description');
});

test('admins cannot create a category with a nonexistent parent', function () {
    $admin = Administrator::factory()->create();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.categories.store'), [
            'name' => 'Categoría huérfana',
            'parent_id' => '01J00000000000000000000000',
            'short_description' => 'Sin padre válido',
        ])
        ->assertSessionHasErrors('parent_id');

    expect(Category::query()->where('name', 'Categoría huérfana')->exists())->toBeFalse();
});

test('guests are redirected to the admin login page when updating categories', function () {
    $category = Category::factory()->create();

    $response = $this->patch(route('admin.categories.update', $category), [
        'name' => 'Updated category',
        'parent_id' => '__root__',
        'short_description' => 'Updated description',
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.auth.login'));
});

test('admins can update a category without changing its slug or code', function () {
    $admin = Administrator::factory()
        ->create();

    $category = Category::factory()
        ->inactive()
        ->create([
            'name' => 'Original Name',
            'short_description' => 'Original description',
        ]);

    $originalSlug = $category->slug;
    $originalCode = $category->code;

    $response = $this->actingAs($admin, 'admin')
        ->patch(route('admin.categories.update', $category), [
            'name' => 'Updated Name',
            'parent_id' => '__root__',
            'short_description' => 'Updated description',
            'is_active' => true,
        ]);

    $response->assertRedirect(route('admin.categories.index'));
    $response->assertInertiaFlash('toast.type', 'success');
    $response->assertInertiaFlash('toast.message', __('actions.categories.updated'));

    $category->refresh();

    expect($category->name)->toBe('Updated Name')
        ->and($category->short_description)->toBe('Updated description')
        ->and($category->is_active)->toBeTrue()
        ->and($category->parent_id)->toBeNull()
        ->and($category->slug)->toBe($originalSlug)
        ->and($category->code)->toBe($originalCode);
});

test('admins can move a category under another parent when updating', function () {
    $admin = Administrator::factory()
        ->create();

    $currentParent = Category::factory()
        ->create(['name' => 'Parent A']);

    $newParent = Category::factory()
        ->create(['name' => 'Parent B']);

    $category = Category::factory()
        ->forParent($currentParent)
        ->create([
            'name' => 'Child Category',
            'short_description' => 'Child description',
        ]);

    $response = $this->actingAs($admin, 'admin')
        ->patch(route('admin.categories.update', $category), [
            'name' => 'Child Category',
            'parent_id' => $newParent->id,
            'short_description' => 'Child description',
            'is_active' => false,
        ]);

    $response->assertRedirect(route('admin.categories.subcategories', $newParent));
    $response->assertInertiaFlash('toast.type', 'success');
    $response->assertInertiaFlash('toast.message', __('actions.categories.updated'));

    expect($category->refresh()->parent_id)->toBe($newParent->id)
        ->and($category->is_active)->toBeFalse();
});

test('admins cannot assign a category as its own parent', function () {
    $admin = Administrator::factory()
        ->create();

    $category = Category::factory()->create([
        'name' => 'Standalone',
    ]);

    $this->actingAs($admin, 'admin')
        ->patch(route('admin.categories.update', $category), [
            'name' => 'Standalone',
            'parent_id' => $category->id,
            'short_description' => 'Standalone description',
            'is_active' => true,
        ])
        ->assertSessionHasErrors('parent_id');
});

test('admins can navigate to the next page of categories', function () {
    $admin = Administrator::factory()->create();
    Category::factory()->count(50)->sequence(fn (Sequence $sequence): array => ['name' => 'Category '.$sequence->index])->create();
    $lastCategory = Category::factory()->create(['name' => 'Zeta']);

    $firstPage = $this->actingAs($admin, 'admin')->get(route('admin.categories.index'));

    $firstPage->assertInertia(fn (Assert $page) => $page
        ->has('categories.data', 50)
        ->where('categories.meta.last_page', 2)
        ->where('categories.links.prev', null)
    );

    $this->get($firstPage->inertiaProps('categories.links.next'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('categories.data', 1)
            ->where('categories.data.0.id', $lastCategory->id)
            ->where('categories.meta.current_page', 2)
            ->where('categories.links.prev', route('admin.categories.index', ['page' => 1]))
            ->where('categories.links.next', null)
        );
});

test('subcategory pagination stays within the selected parent', function () {
    $admin = Administrator::factory()->create();
    $parent = Category::factory()->create(['name' => 'Parent']);
    $children = Category::factory()->forParent($parent);
    $children->count(50)->sequence(fn (Sequence $sequence): array => ['name' => 'Child '.$sequence->index])->create();
    $lastChild = $children->create(['name' => 'Zeta']);

    $firstPage = $this->actingAs($admin, 'admin')->get(route('admin.categories.subcategories', $parent));

    $firstPage->assertInertia(fn (Assert $page) => $page
        ->has('categories.data', 50)
        ->where('categories.meta.total', 51)
        ->where('categories.links.next', route('admin.categories.subcategories', ['category' => $parent, 'page' => 2]))
    );

    $this->get($firstPage->inertiaProps('categories.links.next'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('categories.data', 1)
            ->where('categories.data.0.id', $lastChild->id)
            ->where('parent_category.id', $parent->id)
            ->has('category_parent_options', 52)
        );
});

test('admins cannot assign a category to one of its descendants', function () {
    $admin = Administrator::factory()
        ->create();

    $rootCategory = Category::factory()->create([
        'name' => 'Root',
    ]);

    $childCategory = Category::factory()
        ->forParent($rootCategory)
        ->create([
            'name' => 'Child',
        ]);

    $grandChildCategory = Category::factory()
        ->forParent($childCategory)
        ->create([
            'name' => 'Grandchild',
        ]);

    $this->actingAs($admin, 'admin')
        ->patch(route('admin.categories.update', $rootCategory), [
            'name' => 'Root',
            'parent_id' => strtoupper($grandChildCategory->id),
            'short_description' => 'Root description',
            'is_active' => true,
        ])
        ->assertSessionHasErrors('parent_id');
});
