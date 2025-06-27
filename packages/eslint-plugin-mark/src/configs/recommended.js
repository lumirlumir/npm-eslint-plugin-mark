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
 * @import { Linter } from "eslint";
 * @import { ParserMode } from '../core/types.d.ts';
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Recommended configuration.
 * @param {ParserMode} parserMode
 * @return {Linter.Config}
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
