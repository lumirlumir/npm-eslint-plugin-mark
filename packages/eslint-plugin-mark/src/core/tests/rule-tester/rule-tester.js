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
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("eslint").RuleTester.ValidTestCase} ValidTestCase
 * @typedef {import("eslint").RuleTester.InvalidTestCase} InvalidTestCase
 */

/**
 * @typedef {object} Tests
 * @property {Array<string | ValidTestCase>} valid
 * @property {InvalidTestCase[]} invalid
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
 * @param {string} name
 * @param {RuleModule} rule
 * @param {Tests} tests
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
