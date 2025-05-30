import { defineConfig, globalIgnores } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import mark from 'eslint-plugin-mark';

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  globalIgnores(['**/build/', '**/coverage/', '**/.vitepress/cache/'], 'global/ignores'),
  bananass.configs.js,
  bananass.configs.ts,
  mark.configs.recommendedGfm,
  {
    name: 'website/rules',
    files: ['website/docs/rules/**/*.md'],
    rules: {
      'mark/allowed-heading': [
        'error',
        {
          h2: [
            'Rule Details',
            'Examples',
            'Options',
            'When Not To Use It',
            'AST',
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
