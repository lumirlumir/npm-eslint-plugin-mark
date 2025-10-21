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
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { MarkdownRuleDefinitionTypeOptions } from '@eslint/markdown';
 * @import { RuleModule } from '../types.js';
 * @typedef {MarkdownRuleDefinitionTypeOptions['RuleOptions']} RuleOptions
 * @typedef {MarkdownRuleDefinitionTypeOptions['MessageIds']} MessageIds
 * @typedef {Parameters<RuleTester['run']>[2]} Tests
 */

// --------------------------------------------------------------------------------
// Helper
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
 * @param {RuleModule<RuleOptions, MessageIds>} rule Rule module.
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
