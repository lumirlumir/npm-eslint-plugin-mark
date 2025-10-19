/**
 * @fileoverview Rule to disallow irregular whitespace.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { SkipRanges } from '../../core/ast/index.js';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../../core/types.js';
 * @typedef {[{ skipCode: boolean, skipInlineCode: boolean }]} RuleOptions
 * @typedef {'noIrregularWhitespace'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const irregularWhitespaceRegex =
  /[\v\f\u0085\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow irregular whitespace',
      url: URL_RULE_DOCS('no-irregular-whitespace'),

      recommended: true,
      strict: true,
      style: false,
      typography: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          skipCode: {
            type: 'boolean',
          },
          skipInlineCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: true,
        skipInlineCode: true,
      },
    ],

    messages: {
      noIrregularWhitespace:
        'Irregular whitespace `{{ irregularWhitespace }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ skipCode, skipInlineCode }] = context.options;

    const skipRanges = new SkipRanges();

    return {
      code(node) {
        if (skipCode) skipRanges.push(sourceCode.getRange(node)); // Store range information of `Code`.
      },

      inlineCode(node) {
        if (skipInlineCode) skipRanges.push(sourceCode.getRange(node)); // Store range information of `InlineCode`.
      },

      'root:exit'() {
        const matches = sourceCode.text.matchAll(irregularWhitespaceRegex);

        for (const match of matches) {
          const irregularWhitespace = match[0];

          const startOffset = match.index;
          const endOffset = startOffset + irregularWhitespace.length;

          if (skipRanges.includes(startOffset)) return;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              irregularWhitespace: `U+${irregularWhitespace.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`,
            },

            messageId: 'noIrregularWhitespace',
          });
        }
      },
    };
  },
};
