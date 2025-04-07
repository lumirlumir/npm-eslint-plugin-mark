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

const { description, homepage, name, version } = createRequire(import.meta.url)(
  '../../package.json',
);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {string} */
export const PKG_DESCRIPTION = description;
/** @type {string} */
export const PKG_NAME = name;
/** @type {string} */
export const PKG_VERSION = version;
/** @type {string} */
export const PKG_AUTHOR = '루밀LuMir';

/** @type {string} */
export const URL_HOMEPAGE = homepage;
/** @type {string} */
export const URL_GITHUB = `https://github.com/lumirlumir/npm-${PKG_NAME}`;
/** @type {string} */
export const URL_NPM = 'https://www.npmjs.com';
/** @type {string} */
export const URL_RULE_DOCS = `${URL_HOMEPAGE}/docs/rules/`;
/** @type {string} */
export const URL_RULE_SRC = `${URL_GITHUB}/tree/main/packages/${PKG_NAME}/src/rules`;

/** @type {1} */
export const ZERO_TO_ONE_BASED_OFFSET = 1;
