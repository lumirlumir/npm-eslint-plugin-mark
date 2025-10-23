/**
 * @fileoverview Markdown rule tester.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { doesNotMatch, match, ok } from 'node:assert';
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
 * @param {string} ruleName Rule name.
 * @param {RuleModule<RuleOptions, MessageIds>} rule Rule module.
 * @param {Tests} tests Tests.
 */
export default function ruleTester(ruleName, rule, tests) {
  const { meta } = rule;

  describe(ruleName, () => {
    describe('meta', () => {
      it('`meta` should exist', () => {
        ok(meta);
      });

      it('`meta.type` should exist', () => {
        ok(meta?.type);
      });

      it('`meta.docs` should exist', () => {
        ok(meta?.docs);
      });

      it('`meta.docs.description` should exist and should not end with a period', () => {
        ok(meta?.docs?.description);
        doesNotMatch(meta?.docs?.description, /\.$/);
      });

      it('`meta.docs.url` should exist and should end with the rule name`', () => {
        ok(meta?.docs?.url);
        match(meta?.docs?.url, new RegExp(`${ruleName}$`));
      });

      it('`meta.messages` should exist', () => {
        ok(meta?.messages);
      });

      it('`meta.messages.messageId` should exist and should end with a period', () => {
        // @ts-expect-error -- Required for testing.
        Object.values(meta.messages).forEach(message => {
          ok(message);
          match(message, /\.$/);
        });
      });

      it('`meta.language` should exist and should be `markdown`', () => {
        ok(meta?.language);
        match(meta?.language, /^markdown$/);
      });

      it("`meta.dialects` should exist and should be `'commonmark'` or `'gfm'`", () => {
        ok(meta?.dialects);
        ok(meta?.dialects.length > 0);
        meta?.dialects.forEach(dialect => {
          match(dialect, /^(?:commonmark|gfm)$/);
        });
      });
    });

    describe('rule', () => {
      it('commonmark', () => {
        if (meta?.dialects?.includes('commonmark'))
          ruleTesterCommonmark.run(ruleName, rule, tests);
      });

      it('gfm', () => {
        if (meta?.dialects?.includes('gfm')) ruleTesterGfm.run(ruleName, rule, tests);
      });
    });
  });
}
