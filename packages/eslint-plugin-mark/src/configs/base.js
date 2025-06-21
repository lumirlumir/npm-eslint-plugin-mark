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
 * @typedef {import("eslint").Linter.Config} LinterConfig
 * @typedef {import("../core/types.d.ts").ParserMode} ParserMode
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Base configuration.
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
    languageOptions: {
      frontmatter: 'yaml',
    },
    language: `markdown/${parserMode}`,
  };
}
