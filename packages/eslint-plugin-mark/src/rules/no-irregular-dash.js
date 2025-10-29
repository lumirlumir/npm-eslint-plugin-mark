/**
 * @fileoverview Rule to disallow irregular dash.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { SkipRanges } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ skipCode: boolean, skipInlineCode: boolean }]} RuleOptions
 * @typedef {'noIrregularDash'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const irregularDashRegex =
  /[\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2212\u23af\u2e3a\u2e3b\u30fc\ufe58\ufe63\uff0d]/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow irregular dash',
      url: URL_RULE_DOCS('no-irregular-dash'),
      recommended: true,
      stylistic: false,
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
      noIrregularDash: 'Irregular dash `{{ irregularDash }}` is not allowed.',
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
        if (skipCode) skipRanges.push(sourceCode.getRange(node)); // Store position information of `Code`.
      },

      inlineCode(node) {
        if (skipInlineCode) skipRanges.push(sourceCode.getRange(node)); // Store position information of `InlineCode`.
      },

      'root:exit'() {
        const matches = sourceCode.text.matchAll(irregularDashRegex);

        for (const match of matches) {
          const irregularDash = match[0];

          const startOffset = match.index;
          const endOffset = startOffset + irregularDash.length;

          if (skipRanges.includes(startOffset)) continue;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              irregularDash: `U+${irregularDash.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`,
            },

            messageId: 'noIrregularDash',
          });
        }
      },
    };
  },
};
