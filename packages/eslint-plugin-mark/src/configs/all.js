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
 * @typedef {import("eslint").Linter.Config} LinterConfig
 * @typedef {import("../core/types.d.ts").ParserMode} ParserMode
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * All configuration.
 * @param {ParserMode} parserMode
 * @return {LinterConfig}
 */
export default function all(parserMode) {
  return {
    ...base(parserMode),
    name: `mark/all/${parserMode}`,
    rules: {
      'mark/allowed-heading': 'warn',
      'mark/alt-text': 'error',
      'mark/code-lang-shorthand': 'error',
      'mark/en-capitalization': 'error',
      'mark/heading-id': 'warn',
      'mark/image-title': 'warn',
      'mark/no-bold-paragraph': 'error',
      'mark/no-control-character': 'error',
      'mark/no-curly-quote': 'error',
      'mark/no-double-space': 'error',
      'mark/no-emoji': 'warn',
      'mark/no-git-conflict-marker': 'error',
      'mark/no-irregular-dash': 'error',
      'mark/no-irregular-whitespace': 'error',
      'mark/no-unused-definition': 'error',
    },
  };
}
