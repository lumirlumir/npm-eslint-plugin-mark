/**
 * @fileoverview Rule to disallow emojis in text.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import emojiRegex from 'emoji-regex';

import { textHandler } from '../../core/ast/index.js';
import { getRuleDocsUrl } from '../../core/helpers/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("../../core/types.d.ts").TextExt} TextExt
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: false,
      description: 'Disallow emojis in text',
      url: getRuleDocsUrl('no-emojis'),
    },

    messages: {
      noEmojis: 'Emojis are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      /** @param {TextExt} node */
      text(node) {
        textHandler(context, node);

        node.children.forEach(textLineNode => {
          const matches = [...textLineNode.value.matchAll(emojiRegex())];

          if (matches.length > 0) {
            matches.forEach(match => {
              const emojiLength = match[0].length;

              const matchIndexStart = match.index;
              const matchIndexEnd = matchIndexStart + emojiLength;

              context.report({
                loc: {
                  start: {
                    line: textLineNode.position.start.line,
                    column: textLineNode.position.start.column + matchIndexStart,
                  },
                  end: {
                    line: textLineNode.position.start.line,
                    column: textLineNode.position.start.column + matchIndexEnd,
                  },
                },

                messageId: 'noEmojis',
              });
            });
          }
        });
      },
    };
  },
};
