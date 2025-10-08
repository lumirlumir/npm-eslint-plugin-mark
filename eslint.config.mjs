import { defineConfig, globalIgnores } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import mark from 'eslint-plugin-mark';

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  globalIgnores(['**/build/', '**/coverage/', '**/.vitepress/cache/'], 'global/ignores'),

  bananass.configs.js,
  bananass.configs.ts,
  bananass.configs.json,
  bananass.configs.jsonc,
  bananass.configs.json5,
  mark.configs.recommendedGfm,

  {
    name: 'website/rules',
    files: ['website/docs/rules/**/*.md'],
    rules: {
      'mark/allow-heading': [
        'error',
        {
          h2: [
            'Rule Details',
            'Examples',
            'Options',
            'When Not To Use It',
            'AST', // TODO: Remove
            'Fix',
            'Limitations',
            'Prior Art',
          ],
        },
      ],
      'mark/no-emoji': 'error',
    },
  },
]);
