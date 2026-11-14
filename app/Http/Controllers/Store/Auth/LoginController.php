<?php

namespace App\Http\Controllers\Store\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $props = [
            'canResetPassword' => true,
            'status' => $request->session()->get('status'),
        ];

        return Inertia::render('store/auth/login', $props);
    }
}
