/**
 * @fileoverview Entry file for the `eslint-plugin-mark` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { all, base, recommended, stylistic } from './configs/index.js';
import { PKG_NAME as name, PKG_VERSION as version } from './core/constants.js';
import rules from './rules/index.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { ESLint, Linter } from "eslint";
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
    /** @returns {Linter.Config} */
    get all() {
      return all(plugin);
    },
    /** @returns {Linter.Config} */
    get base() {
      return base(plugin);
    },
    /** @returns {Linter.Config} */
    get recommended() {
      return recommended(plugin);
    },
    /** @returns {Linter.Config} */
    get stylistic() {
      return stylistic(plugin);
    },
  },
});

export default plugin;
