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

/** @type {{ description: string, homepage: string, name: 'eslint-plugin-mark', version: string }} */
const { description, homepage, name, version } = createRequire(import.meta.url)(
  '../../package.json',
);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @satisfies {string} */
export const PKG_DESCRIPTION = description;
/** @satisfies {string} */
export const PKG_NAME = name;
/** @satisfies {string} */
export const PKG_VERSION = version;
/** @satisfies {string} */
export const PKG_AUTHOR = '루밀LuMir';

/** @satisfies {string} */
export const URL_HOMEPAGE = homepage;
/** @satisfies {string} */
export const URL_GITHUB = `https://github.com/lumirlumir/npm-${PKG_NAME}`;
/** @satisfies {string} */
export const URL_NPM = 'https://www.npmjs.com';
/** @satisfies {string} */
export const URL_RULE_SRC = `${URL_GITHUB}/tree/main/packages/${PKG_NAME}/src/rules`;
/** Get the URL for the rule documentation based on the rule name. @param {string} [ruleName] */
export const URL_RULE_DOCS = (ruleName = '') => `${URL_HOMEPAGE}/docs/rules/${ruleName}`;

/** @satisfies {number} */
export const ZERO_TO_ONE_BASED_OFFSET = 1;
