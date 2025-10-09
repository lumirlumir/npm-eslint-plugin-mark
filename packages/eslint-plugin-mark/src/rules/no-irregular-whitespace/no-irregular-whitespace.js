/**
 * @fileoverview Rule to disallow irregular whitespace.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { IgnoredPositions } from '../../core/ast/index.js';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { RuleModule } from '../../core/types.js';
 * @typedef {[{ skipCode: boolean, skipInlineCode: boolean }]} RuleOptions
 * @typedef {'noIrregularWhitespace'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const irregularWhitespaceRegex =
  /[\f\v\u0085\ufeff\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000\u2028\u2029]/gu;

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

    const ignoredPositions = new IgnoredPositions();

    return {
      code(node) {
        if (skipCode) ignoredPositions.push(sourceCode.getLoc(node)); // Store position information of `Code`.
      },

      inlineCode(node) {
        if (skipInlineCode) ignoredPositions.push(sourceCode.getLoc(node)); // Store position information of `InlineCode`.
      },

      'root:exit'() {
        const matches = sourceCode.text.matchAll(irregularWhitespaceRegex);

        for (const match of matches) {
          const irregularWhitespace = match[0];

          const startOffset = match.index;
          const endOffset = startOffset + irregularWhitespace.length;

          /** @type {Position} */
          const loc = {
            start: sourceCode.getLocFromIndex(startOffset),
            end: sourceCode.getLocFromIndex(endOffset),
          };

          if (ignoredPositions.isIgnoredPosition(loc)) return;

          context.report({
            loc,

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
