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
 * @typedef {import("eslint").Linter.Config} LinterConfig
 * @typedef {import("../core/types.d.ts").ParserMode} ParserMode
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Recommended configuration.
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
      'mark/en-capitalization': 'error',
      'mark/no-bold-paragraph': 'error',
      'mark/no-control-character': 'error',
      'mark/no-curly-quote': 'error',
      'mark/no-double-space': 'error',
      'mark/no-git-conflict-marker': 'error',
      'mark/no-irregular-dash': 'error',
      'mark/no-irregular-whitespace': 'error',
      'mark/no-unused-definition': 'error',
    },
  };
}
