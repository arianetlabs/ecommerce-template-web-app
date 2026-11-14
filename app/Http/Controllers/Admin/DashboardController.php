<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $dashboardDate = now()->toISOString();

        return Inertia::render('admin/dashboard/index', [
            'dashboardDate' => $dashboardDate,
        ]);
    }
}
