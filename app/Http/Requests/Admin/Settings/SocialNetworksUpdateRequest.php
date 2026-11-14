<?php

namespace App\Http\Requests\Admin\Settings;

use App\Models\SiteSetting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\In;

class SocialNetworksUpdateRequest extends FormRequest
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
     * @return array<string, list<string|In>>
     */
    public function rules(): array
    {
        $rules = [
            'linkedin_profile_type' => ['required', Rule::in(SiteSetting::LINKEDIN_PROFILE_TYPES)],
        ];

        foreach (array_keys(SiteSetting::SOCIAL_NETWORK_PREFIXES) as $network) {
            $rules[$network] = ['nullable', 'string', 'max:100', 'regex:/\A[\p{L}\p{N}_][\p{L}\p{M}\p{N}._-]*\z/u'];
        }

        return $rules;
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        $messages = [
            'linkedin_profile_type.required' => 'Selecciona el tipo de perfil de LinkedIn.',
            'linkedin_profile_type.in' => 'Selecciona Perfil personal o Empresa para LinkedIn.',
        ];

        foreach (array_keys(SiteSetting::SOCIAL_NETWORK_PREFIXES) as $network) {
            $messages[$network.'.regex'] = 'Ingresa solo el nombre de usuario, sin @, espacios ni enlace.';
        }

        return $messages;
    }
}
