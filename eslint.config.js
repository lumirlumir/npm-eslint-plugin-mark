import { defineConfig, globalIgnores } from 'eslint/config';
import js from 'eslint-config-bananass/js';
import ts from 'eslint-config-bananass/ts';
import json from 'eslint-config-bananass/json';
import jsonc from 'eslint-config-bananass/jsonc';
import json5 from 'eslint-config-bananass/json5';
import md from 'eslint-markdown';

export default defineConfig([
  globalIgnores(
    ['**/build/', '**/coverage/', '**/.vitepress/.temp/', '**/.vitepress/cache/'],
    'global/ignores',
  ),

  js,
  ts,
  json,
  jsonc,
  json5,
  md.configs.recommended,
  md.configs.stylistic,

  // js
  {
    name: 'js/global',
    rules: {
      'import/no-cycle': 'off', // Too computationally expensive. TODO: Remove this in shared config.
      'import/no-extraneous-dependencies': 'off', // Too computationally expensive. TODO: Remove this in shared config.
    },
  },
  {
    name: 'js/global/test-d',
    files: ['**/*.test-d.{ts,mts,cts,tsx}'],
    rules: {
      'no-useless-assignment': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    name: 'js/eslint-markdown/rules',
    files: ['packages/eslint-markdown/src/rules/*.ts'],
    ignores: ['packages/eslint-markdown/src/rules/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./core/utils(?:$|/(?!index\\.js$))',
              message: "Import utilities from '../core/utils/index.js' instead.",
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '../core/utils/index.js',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '../core/constants.js',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '../core/types.js',
              group: 'parent',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // md
  {
    name: 'md/global',
    files: ['**/*.md'],
    rules: {
      'md/allow-link-url': [
        'error',
        {
          disallowUrls: [/^\.\//],
        },
      ],
    },
  },
  {
    name: 'md/website',
    files: ['website/docs/**/*.md'],
    rules: {
      'md/no-emoji': 'error',
    },
  },
  {
    name: 'md/website/rules',
    files: ['website/docs/rules/**/*.md'],
    rules: {
      'md/allow-heading': [
        'error',
        {
          h2: {
            allow: [
              /^## (?:Rule Details|Examples|Options|Fix|Suggestion|Limitations|When Not To Use It|Further Reading|Prior Art)$/u,
            ],
          },
        },
      ],
    },
  },
]);
