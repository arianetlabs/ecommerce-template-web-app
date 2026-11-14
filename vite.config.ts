import inertia from '@inertiajs/vite'
import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { google } from 'laravel-vite-plugin/fonts'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
  plugins: lazyPlugins(() => [
    laravel({
      input: ['resources/css/admin.css', 'resources/css/store.css', 'resources/js/app.tsx'],
      refresh: true,
      fonts: [
        google('Inter', {
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          optimizedFallbacks: false,
        }),
        google('Source Code Pro', {
          weights: [400, 700],
          optimizedFallbacks: false,
        }),
      ],
    }),
    inertia(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
  ]),
  server: {
    watch: {
      ignored: ['**/.agents/**', '**/.ai/**', '**/.claude/**', '**/.codex/**', '**/.cursor/**', '**/.junie/**', '**/vendor/**'],
    },
  },
  lint: {
    ignorePatterns: [
      'vendor/**',
      'node_modules/**',
      'public/**',
      'bootstrap/ssr/**',
      'resources/js/actions/**',
      'resources/js/components/admin/ui/*',
      'resources/js/components/store/ui/*',
      'resources/js/routes/**',
      'resources/js/wayfinder/**',
    ],
    options: {
      denyWarnings: true,
      typeAware: true,
    },
    rules: {
      curly: 'error',
      'typescript/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
      'no-unused-vars': ['warn', { args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-restricted-imports': ['error', { patterns: ['@/components/ui/**'] }],
    },
    overrides: [
      {
        files: ['resources/js/{components,hooks,layouts,lib,pages,types}/admin/**/*.{ts,tsx}'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                '@/components/ui/**',
                {
                  group: ['@/components/store/**', '@/hooks/store/**', '@/layouts/store/**', '@/lib/store/**', '@/pages/store/**', '@/types/store/**'],
                  message: 'Admin code may not import Store-owned frontend modules.',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['resources/js/{components,hooks,layouts,lib,pages,types}/store/**/*.{ts,tsx}'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                '@/components/ui/**',
                {
                  group: ['@/components/admin/**', '@/hooks/admin/**', '@/layouts/admin/**', '@/lib/admin/**', '@/pages/admin/**', '@/types/admin/**'],
                  message: 'Store code may not import Admin-owned frontend modules.',
                },
              ],
            },
          ],
        },
      },
    ],
  },
  fmt: {
    printWidth: 180,
    tabWidth: 2,
    singleQuote: true,
    semi: false,
    singleAttributePerLine: true,
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: [
      '.agents/**',
      '.ai/**',
      '.codex/**',
      '.github/**',
      '.idea/**',
      '.junie/**',
      '.vscode/**',
      '.mcp.json',
      'README.md',
      'AGENTS.md',
      'boost.json',
      'composer.json',
      'lang/*.json',
      'resources/js/actions/**',
      'resources/js/components/admin/ui/*',
      'resources/js/components/store/ui/*',
      'resources/js/routes/**',
      'resources/js/wayfinder/**',
      'resources/views/mail/*',
      'tsconfig.json',
    ],
    sortImports: {
      internalPattern: ['@/**'],
      newlinesBetween: false,
    },
    overrides: [
      {
        files: ['resources/js/{components,layouts,pages}/admin/**/*.tsx'],
        options: {
          sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: 'resources/css/admin.css',
          },
        },
      },
      {
        files: ['resources/js/{components,layouts,pages}/store/**/*.tsx'],
        options: {
          sortTailwindcss: {
            functions: ['clsx', 'cn', 'cva'],
            stylesheet: 'resources/css/store.css',
          },
        },
      },
    ],
  },
})
