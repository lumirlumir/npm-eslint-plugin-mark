/**
 * @fileoverview Rule tester for CommonMark.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import markdown from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Rule Tester
// --------------------------------------------------------------------------------

/**
 * Rule tester for CommonMark.
 */
const ruleTesterCommonmark = new RuleTester({
  plugins: {
    markdown,
  },
  language: 'markdown/commonmark',
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default ruleTesterCommonmark;
