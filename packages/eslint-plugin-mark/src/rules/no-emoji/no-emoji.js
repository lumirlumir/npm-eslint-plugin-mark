/**
 * @fileoverview Rule to disallow emojis in text.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import emojiRegex from 'emoji-regex';

import { TextHandler } from '../../core/ast/index.js';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../../core/types.js';
 * @typedef {[]} RuleOptions
 * @typedef {'noEmoji'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow emojis in text',
      url: URL_RULE_DOCS('no-emoji'),

      recommended: false,
      strict: false,
      style: false,
      typography: false,
    },

    messages: {
      noEmoji: 'Emojis are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      text(node) {
        const textHandler = new TextHandler(context, node);

        textHandler.lines.forEach(textLineNode => {
          const matches = textLineNode.value.matchAll(emojiRegex());

          for (const match of matches) {
            const emojiLength = match[0].length;

            const startOffset = match.index + textLineNode.position.start.offset;
            const endOffset = startOffset + emojiLength;

            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(startOffset),
                end: sourceCode.getLocFromIndex(endOffset),
              },

              messageId: 'noEmoji',
            });
          }
        });
      },
    };
  },
};
