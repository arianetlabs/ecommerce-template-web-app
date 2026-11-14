<?php

namespace App\Actions\Settings;

use App\Models\Administrator;

class UpdateAdministratorPasswordAction
{
    public function handle(Administrator $administrator, string $password): void
    {
        $administrator->update([
            'password' => $password,
        ]);
    }
}
