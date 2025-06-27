/**
 * @fileoverview Markdown rule tester.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { RuleTester } from 'eslint';
import markdown from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from "../../types.d.ts";
 * @typedef {Parameters<RuleTester['run']>[2]} Tests
 */

// --------------------------------------------------------------------------------
// Helpers
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

/**
 * Rule tester for GFM.
 */
const ruleTesterGfm = new RuleTester({
  plugins: {
    markdown,
  },
  language: 'markdown/gfm',
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Markdown rule tester.
 * @param {string} name Rule name.
 * @param {RuleModule} rule Rule module.
 * @param {Tests} tests Tests.
 */
export default function ruleTester(name, rule, tests) {
  const dialects = rule?.meta?.dialects;

  if (!dialects) throw new Error('Rule meta dialects should be defined');
  if (dialects.length === 0) throw new Error('Rule meta dialects should not be empty');

  test(name, () => {
    if (dialects.includes('commonmark')) ruleTesterCommonmark.run(name, rule, tests);
    if (dialects.includes('gfm')) ruleTesterGfm.run(name, rule, tests);
  });
}
