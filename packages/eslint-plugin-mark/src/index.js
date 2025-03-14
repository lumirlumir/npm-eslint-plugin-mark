/**
 * @fileoverview Entry file for the `eslint-plugin-mark` package.
 * @module eslint-plugin-mark
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRequire } from 'node:module';
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

  configs: {},
};
