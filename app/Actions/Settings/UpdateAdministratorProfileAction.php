<?php

namespace App\Actions\Settings;

use App\Models\Administrator;

class UpdateAdministratorProfileAction
{
    /** @param array<string, mixed> $validated */
    public function handle(Administrator $administrator, array $validated): void
    {
        $administrator->fill($validated);
        $administrator->save();
    }
}
