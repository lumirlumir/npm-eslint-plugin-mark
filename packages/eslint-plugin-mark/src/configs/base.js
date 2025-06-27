/**
 * @fileoverview Base configuration.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import markdown from '@eslint/markdown';
import rules from '../rules/index.js';

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
 * Base configuration.
 * @param {ParserMode} parserMode
 * @return {Linter.Config}
 */
export default function base(parserMode) {
  return {
    name: `mark/base/${parserMode}`,
    files: ['**/*.md'],
    plugins: {
      markdown,
      mark: { rules },
    },
    languageOptions: {
      frontmatter: 'yaml',
    },
    language: `markdown/${parserMode}`,
  };
}
