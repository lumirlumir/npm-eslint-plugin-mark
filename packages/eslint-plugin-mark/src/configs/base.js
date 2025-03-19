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
 * @typedef {import("@eslint/markdown").ParserMode} ParserMode
 * @typedef {import("eslint").Linter.Config} LinterConfig
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Base configuration.
 *
 * @param {ParserMode} parserMode
 * @return {LinterConfig}
 */
export default function base(parserMode) {
  return {
    name: `mark/base/${parserMode}`,
    files: ['**/*.md'],
    plugins: {
      markdown,
      mark: { rules },
    },
    language: `markdown/${parserMode}`,
  };
}
