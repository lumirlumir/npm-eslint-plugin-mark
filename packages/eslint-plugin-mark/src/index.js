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

/** @satisfies {ESLint.Plugin} */
const plugin = /** @type {const} */ ({
  meta: {
    name,
    version,
  },

  rules,

  configs: {
    /** @returns {ReturnType<typeof all>} */
    get all() {
      return all(plugin);
    },
    /** @returns {ReturnType<typeof base>} */
    get base() {
      return base(plugin);
    },
    /** @returns {ReturnType<typeof recommended>} */
    get recommended() {
      return recommended(plugin);
    },
    /** @returns {ReturnType<typeof stylistic>} */
    get stylistic() {
      return stylistic(plugin);
    },
  },
});

export default plugin;
