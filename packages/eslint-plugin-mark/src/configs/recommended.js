/**
 * @fileoverview Recommended configuration.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import base from './base.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").ParserMode} ParserMode
 * @typedef {import("eslint").Linter.Config} LinterConfig
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Recommended configuration.
 *
 * @param {ParserMode} parserMode
 * @return {LinterConfig}
 */
export default function recommended(parserMode) {
  return {
    ...base(parserMode),
    name: `mark/recommended/${parserMode}`,
    rules: {
      'mark/alt-text': 'error',
      'mark/code-lang-shorthand': 'error',
      'mark/no-curly-quotes': 'error',
      'mark/no-double-spaces': 'error',
      'mark/no-irregular-whitespace': 'error',
    },
  };
}
