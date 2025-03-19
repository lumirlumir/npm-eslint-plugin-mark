/**
 * @fileoverview Entry file for the `eslint-plugin-mark` package.
 * @module eslint-plugin-mark
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRequire } from 'node:module';

import { all, base } from './configs/index.js';
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
const commonmark = 'commonmark';
const gfm = 'gfm';

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
    allCommonmark: all(commonmark),
    allGfm: all(gfm),
    baseCommonmark: base(commonmark),
    baseGfm: base(gfm),
  },
};
