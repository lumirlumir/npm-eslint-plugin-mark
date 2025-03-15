/**
 * @fileoverview All rulesets from `eslint-plugin-mark`.
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
 * All rulesets from `eslint-plugin-mark`.
 *
 * @param {ParserMode} parserMode
 * @return {LinterConfig}
 */
export default function all(parserMode) {
  return {
    name: `all/${parserMode}`,
    files: ['**/*.md'],
    plugins: {
      markdown,
      mark: { rules },
    },
    language: `markdown/${parserMode}`,
    rules: {
      'mark/no-curly-quotes': 'error',
      'mark/no-double-spaces': 'error',
    },
  };
}
