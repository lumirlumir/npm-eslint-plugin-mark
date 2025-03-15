/**
 * @fileoverview Entry file for the `eslint-plugin-mark` package.
 * @module eslint-plugin-mark
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRequire } from 'node:module';

import { all } from './configs/index.js';
import rules from './rules/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("eslint").ESLint.Plugin} Plugin
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const { name, version } = createRequire(import.meta.url)('../package.json');

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {Plugin} */
export default {
  meta: {
    name,
    version,
  },

  rules,

  configs: {
    all: {
      // @ts-ignore -- TODO: https://github.com/eslint/eslint/issues/19519
      commonmark: all('commonmark'),
      gfm: all('gfm'),
    },
  },
};
