/**
 * @fileoverview Tests for rule's `meta` properties.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { doesNotMatch, match, ok } from 'node:assert';

import mark from 'eslint-plugin-mark';
import { getFileName } from 'eslint-plugin-mark/core/tests';

// ---------------------------------------------------------------------------------
// Test
// ---------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  it('`meta` should exist', () => {
    Object.values(mark.rules).forEach(rule => {
      const { meta } = rule;

      ok(meta);
    });
  });

  it('`meta.type` should exist', () => {
    Object.values(mark.rules).forEach(rule => {
      const { type } = rule.meta;

      ok(type);
    });
  });

  it('`meta.docs` should exist', () => {
    Object.values(mark.rules).forEach(rule => {
      const { docs } = rule.meta;

      ok(docs);
    });
  });

  it('`meta.docs.description` should exist and should not end with a period', () => {
    Object.values(mark.rules).forEach(rule => {
      const { description } = rule.meta.docs;

      ok(description);
      doesNotMatch(description, /\.$/);
    });
  });

  it('`meta.docs.url` should exist and should end with the rule name defined in `index.js`', () => {
    Object.entries(mark.rules).forEach(([ruleName, rule]) => {
      const { url } = rule.meta.docs;

      ok(url);
      match(rule.meta.docs.url, new RegExp(`${ruleName}$`));
    });
  });

  it('`meta.messages` should exist', () => {
    Object.values(mark.rules).forEach(rule => {
      const { messages } = rule.meta;

      ok(messages);
    });
  });

  it('`meta.message.messageId` should exist and should end with a period', () => {
    Object.values(mark.rules).forEach(rule => {
      const { messages } = rule.meta;

      Object.values(messages).forEach(message => {
        ok(message);
        match(message, /\.$/);
      });
    });
  });

  it('`meta.language` should exist and should be `markdown`', () => {
    Object.values(mark.rules).forEach(rule => {
      const { language } = rule.meta;

      ok(language);
      match(language, /^markdown$/);
    });
  });

  it("`meta.dialects` should exist and should be `'commonmark'` or `'gfm'`", () => {
    Object.values(mark.rules).forEach(rule => {
      const { dialects } = rule.meta;

      ok(dialects);
      ok(dialects.length > 0);
      dialects.forEach(dialect => {
        match(dialect, /^(?:commonmark|gfm)$/);
      });
    });
  });
});
