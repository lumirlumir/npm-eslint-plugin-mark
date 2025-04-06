/**
 * @fileoverview All configuration.
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
 * All configuration.
 *
 * @param {ParserMode} parserMode
 * @return {LinterConfig}
 */
export default function all(parserMode) {
  return {
    ...base(parserMode),
    name: `mark/all/${parserMode}`,
    rules: {
      'mark/alt-text': 'error',
      'mark/code-lang-shorthand': 'error',
      'mark/heading-id': 'warn',
      'mark/no-curly-quote': 'error',
      'mark/no-double-space': 'error',
      'mark/no-emoji': 'warn',
      'mark/no-irregular-whitespace': 'error',
    },
  };
}
