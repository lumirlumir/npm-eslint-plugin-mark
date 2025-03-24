/**
 * @fileoverview This file declares constants used throughout the `eslint-plugin-mark` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRequire } from 'node:module';

// --------------------------------------------------------------------------------
// Declaration
// --------------------------------------------------------------------------------

const { homepage } = createRequire(import.meta.url)('../../package.json');

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {string} */
export const URL_HOMEPAGE = homepage;
/** @type {string} */
export const URL_RULES = `${URL_HOMEPAGE}/docs/rules/`;
