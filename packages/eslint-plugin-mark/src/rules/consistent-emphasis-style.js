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
 * @typedef {'consistentEmphasisStyle'} MessageIds
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
      strict: false,
      style: true,
      typography: false,
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
      consistentEmphasisStyle: 'Emphasis style should be `{{ style }}`.',
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
      thematicBreak(node) {
        const currentEmphasisStyle = sourceCode.getText(node);

        if (emphasisStyle === null) {
          emphasisStyle = currentEmphasisStyle;
        }

        if (emphasisStyle !== currentEmphasisStyle) {
          context.report({
            node,

            messageId: 'consistentEmphasisStyle',

            data: {
              style: emphasisStyle,
            },

            fix(fixer) {
              return fixer.replaceTextRange(
                sourceCode.getRange(node),
                String(emphasisStyle),
              );
            },
          });
        }
      },
    };
  },
};
