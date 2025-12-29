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

const plugin = {
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

// @ts-expect-error -- Intentionally assign the `plugin` to each config's `plugins` to support `extends` style configuration.
plugin.configs.all.plugins.mark = plugin;
// @ts-expect-error -- Intentionally assign the `plugin` to each config's `plugins` to support `extends` style configuration.
plugin.configs.base.plugins.mark = plugin;
// @ts-expect-error -- Intentionally assign the `plugin` to each config's `plugins` to support `extends` style configuration.
plugin.configs.recommended.plugins.mark = plugin;
// @ts-expect-error -- Intentionally assign the `plugin` to each config's `plugins` to support `extends` style configuration.
plugin.configs.stylistic.plugins.mark = plugin;

/** @type {ESLint.Plugin} */
export default plugin;
