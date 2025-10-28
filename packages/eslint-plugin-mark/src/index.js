/**
 * @fileoverview Entry file for the `eslint-plugin-mark` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { PKG_NAME as name, PKG_VERSION as version } from './core/constants.js';
import { all, base, recommended, stylistic } from './configs/index.js';
import rules from './rules/index.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { ESLint } from "eslint";
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {ESLint.Plugin} */
export default {
  meta: {
    name,
    version,
  },

  rules,

  configs: {
    all,
    base,
    recommended,
    stylistic,
  },
};
