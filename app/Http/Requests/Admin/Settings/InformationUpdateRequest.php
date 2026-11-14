<?php

namespace App\Http\Requests\Admin\Settings;

use Illuminate\Foundation\Http\FormRequest;

class InformationUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return [
            'site_name' => ['required', 'string', 'max:128'],
            'site_description' => ['required', 'string', 'max:255'],
            'site_keywords' => ['required', 'string', 'max:255'],
            'footer_credit_name' => ['required', 'string', 'max:128'],
            'email' => ['required', 'string', 'email:rfc', 'max:128'],
            'phone' => ['required', 'string', 'digits:9'],
            'address' => ['required', 'string', 'max:128'],
        ];
    }
}
