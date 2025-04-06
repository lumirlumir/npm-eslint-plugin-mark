/**
 * @fileoverview Tests for rule's `meta` properties.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { doesNotMatch, match, ok } from 'node:assert';

import mark from 'eslint-plugin-mark';

// ---------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------

const { rules } = mark;

// ---------------------------------------------------------------------------------
// Test
// ---------------------------------------------------------------------------------

describe('rules-meta', () => {
  it('`meta` should exist', () => {
    Object.values(rules).forEach(rule => {
      const { meta } = rule;

      ok(meta);
    });
  });

  it('`meta.type` should exist', () => {
    Object.values(rules).forEach(rule => {
      const { type } = rule.meta;

      ok(type);
    });
  });

  it('`meta.docs` should exist', () => {
    Object.values(rules).forEach(rule => {
      const { docs } = rule.meta;

      ok(docs);
    });
  });

  it('`meta.docs.description` should exist and should not end with a period', () => {
    Object.values(rules).forEach(rule => {
      const { description } = rule.meta.docs;

      ok(description);
      doesNotMatch(description, /\.$/);
    });
  });

  it('`meta.docs.url` should exist and should end with the rule name defined in `index.js`', () => {
    Object.entries(rules).forEach(([ruleName, rule]) => {
      const { url } = rule.meta.docs;

      ok(url);
      match(rule.meta.docs.url, new RegExp(`${ruleName}$`));
    });
  });

  it('`meta.messages` should exist', () => {
    Object.values(rules).forEach(rule => {
      const { messages } = rule.meta;

      ok(messages);
    });
  });

  it('`meta.message.messageId` should exist and should end with a period', () => {
    Object.values(rules).forEach(rule => {
      const { messages } = rule.meta;

      Object.values(messages).forEach(message => {
        ok(message);
        match(message, /\.$/);
      });
    });
  });

  it('`meta.language` should exist and should be `markdown`', () => {
    Object.values(rules).forEach(rule => {
      const { language } = rule.meta;

      ok(language);
      match(language, /^markdown$/);
    });
  });

  it("`meta.dialects` should exist and should be `'commonmark'` or `'gfm'`", () => {
    Object.values(rules).forEach(rule => {
      const { dialects } = rule.meta;

      ok(dialects);
      dialects.forEach(dialect => {
        match(dialect, /^(?:commonmark|gfm)$/);
      });
    });
  });
});
