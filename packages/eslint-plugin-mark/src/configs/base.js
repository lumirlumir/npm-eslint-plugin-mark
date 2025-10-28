/**
 * @fileoverview Base configuration.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import markdown from '@eslint/markdown';
import rules from '../rules/index.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Linter } from "eslint";
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {Linter.Config} */
export default {
  name: 'mark/base',
  files: ['**/*.md'],
  plugins: {
    markdown,
    mark: { rules },
  },
  languageOptions: {
    frontmatter: 'yaml',
  },
  language: 'markdown/gfm',
};
