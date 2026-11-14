<?php

use App\Models\Administrator;
use App\Models\Customer;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the admin login page when accessing customers index', function () {
    $this->get(route('admin.customers.index'))
        ->assertRedirect(route('admin.auth.login'));
});

test('customer listing contains only customer identities', function () {
    $administrator = Administrator::factory()->create();
    $customer = Customer::factory()->create();

    $this->actingAs($administrator, 'admin')
        ->get(route('admin.customers.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/customers/index')
            ->has('customers.data', 1)
            ->where('customers.data.0.id', $customer->id)
            ->where('customers.data.0.kind', 'customer')
        );
});

test('admins can navigate to the next page of customers', function () {
    $admin = Administrator::factory()->create();
    Customer::factory()->count(50)->create();
    $lastCustomer = Customer::factory()->create(['created_at' => now()->subDay()]);

    $firstPage = $this->actingAs($admin, 'admin')->get(route('admin.customers.index'));

    $firstPage->assertInertia(fn (Assert $page) => $page
        ->has('customers.data', 50)
        ->where('customers.meta.last_page', 2)
        ->where('customers.links.prev', null)
    );

    $this->get($firstPage->inertiaProps('customers.links.next'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('customers.data', 1)
            ->where('customers.data.0.id', $lastCustomer->id)
            ->where('customers.meta.current_page', 2)
            ->where('customers.links.prev', route('admin.customers.index', ['page' => 1]))
            ->where('customers.links.next', null)
        );
});
