/**
 * @fileoverview Rule to enforce consistent emphasis style.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ style: 'consistent' | '*' | '_' }]} RuleOptions
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent emphasis style',
      url: URL_RULE_DOCS('consistent-emphasis-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', '*', '_'],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'consistent',
      },
    ],

    messages: {
      style: 'Emphasis style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /** @type {string | null} */
    let emphasisStyle = style === 'consistent' ? null : style;

    return {
      emphasis(node) {
        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const currentEmphasisStyle = sourceCode.text[nodeStartOffset];

        if (emphasisStyle === null) {
          emphasisStyle = currentEmphasisStyle;
        }

        if (emphasisStyle !== currentEmphasisStyle) {
          context.report({
            node,

            messageId: 'style',

            data: {
              style: emphasisStyle,
            },

            fix(fixer) {
              return [
                fixer.replaceTextRange(
                  [nodeStartOffset, nodeStartOffset + 1],
                  String(emphasisStyle),
                ),
                fixer.replaceTextRange(
                  [nodeEndOffset - 1, nodeEndOffset],
                  String(emphasisStyle),
                ),
              ];
            },
          });
        }
      },
    };
  },
};
