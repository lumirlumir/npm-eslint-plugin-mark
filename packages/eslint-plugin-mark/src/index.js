/**
 * @fileoverview Entry file for the `eslint-plugin-mark` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { PKG_NAME as name, PKG_VERSION as version } from './core/constants.js';
import { all, base, recommended } from './configs/index.js';
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
    recommendedCommonmark: recommended(commonmark),
    recommendedGfm: recommended(gfm),
  },
};
