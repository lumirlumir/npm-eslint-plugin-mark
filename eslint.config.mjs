import bananass from 'eslint-config-bananass';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['**/build/', '**/coverage/', '**/.vitepress/cache/'],
  },
  bananass.configs.js,
  bananass.configs.ts,
];
