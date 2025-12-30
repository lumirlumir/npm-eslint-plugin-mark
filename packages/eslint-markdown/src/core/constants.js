/**
 * @fileoverview This file declares constants used throughout the `eslint-markdown` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRequire } from 'node:module';

// --------------------------------------------------------------------------------
// Declaration
// --------------------------------------------------------------------------------

/** @type {{ homepage: string, name: 'eslint-markdown', version: string }} */
const { homepage, name, version } = createRequire(import.meta.url)('../../package.json');

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @satisfies {string} */
export const PKG_NAME = name;
/** @satisfies {string} */
export const PKG_VERSION = version;
/** Get the URL for the rule documentation based on the rule name. @param {string} [ruleName] */
export const URL_RULE_DOCS = (ruleName = '') => `${homepage}/docs/rules/${ruleName}`;
