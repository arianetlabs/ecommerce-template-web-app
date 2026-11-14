<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                const isDark = appearance === 'dark'
                    || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', isDark);
                document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
            })();
        </script>

        {{-- Inline style to set the HTML background color before the environment stylesheet loads. --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon"
              href="{{ $appearance === 'dark' ? $page['props']['site']['branding']['favicon_dark']['url'] : $page['props']['site']['branding']['favicon']['url'] }}"
              data-site-favicon
              data-light="{{ $page['props']['site']['branding']['favicon']['url'] }}"
              data-dark="{{ $page['props']['site']['branding']['favicon_dark']['url'] }}">

        @fonts

        @php
            $stylesheet = str_starts_with($page['component'], 'admin/')
                ? 'resources/css/admin.css'
                : 'resources/css/store.css';
        @endphp

        @viteReactRefresh
        @vite([$stylesheet, 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
