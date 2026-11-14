<?php

namespace App\Http\Controllers\Store\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ResetPasswordController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $props = [
            'email' => $request->string('email', strict: true)->toString(),
            'token' => $request->route('token'),
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ];

        return Inertia::render('store/auth/reset-password', $props);
    }
}
