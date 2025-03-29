import bananass from 'eslint-config-bananass';
import mark from 'eslint-plugin-mark';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'global/ignores',
    ignores: ['**/build/', '**/coverage/', '**/.vitepress/cache/'],
  },
  bananass.configs.js,
  bananass.configs.ts,
  mark.configs.recommendedGfm,
];
