<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $props = [
            'status' => $request->session()->get('status'),
        ];

        return Inertia::render('admin/auth/login', $props);
    }
}
