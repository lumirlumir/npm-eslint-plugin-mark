/**
 * @fileoverview Rule to disallow double or multiple consecutive spaces in text, except for leading and trailing spaces.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { TextHandler } from '../../core/ast/index.js';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../../core/types.js';
 * @typedef {[{ checkMultipleSpace: boolean }]} RuleOptions
 * @typedef {'noDoubleSpace' | 'noMultipleSpace'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const doubleSpaceRegex = /(?<! ) {2}(?! )/g; // Exactly two spaces. No more, no less.
const multipleSpaceRegex = /(?<! ) {2,}(?! )/g; // More than two spaces.
const leadingSpaceRegex = /^ */;
const singleSpace = ' ';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description:
        'Disallow double or multiple consecutive spaces in text, except for leading and trailing spaces',
      url: URL_RULE_DOCS('no-double-space'),

      recommended: true,
      strict: true,
      style: false,
      typography: false,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          checkMultipleSpace: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkMultipleSpace: false,
      },
    ],

    messages: {
      noDoubleSpace:
        'Double spaces are not allowed except for leading and trailing spaces.',
      noMultipleSpace:
        'Multiple spaces are not allowed except for leading and trailing spaces.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      text(node) {
        const textHandler = new TextHandler(context, node);

        const { sourceCode } = context;
        const [{ checkMultipleSpace }] = context.options;
        const spaceRegex = checkMultipleSpace ? multipleSpaceRegex : doubleSpaceRegex;
        const messageId = checkMultipleSpace ? 'noMultipleSpace' : 'noDoubleSpace';

        textHandler.lines.forEach(textLineNode => {
          const matches = textLineNode.value.trim().matchAll(spaceRegex);

          for (const match of matches) {
            const spaceLength = match[0].length;
            const leadingSpaceLength =
              textLineNode.value.match(leadingSpaceRegex)[0].length;

            const startOffset = // Adjust regex match index to the full source code.
              leadingSpaceLength + match.index + textLineNode.position.start.offset;
            const endOffset = startOffset + spaceLength;

            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(startOffset),
                end: sourceCode.getLocFromIndex(endOffset),
              },

              messageId,

              fix(fixer) {
                return fixer.replaceTextRange([startOffset, endOffset], singleSpace);
              },
            });
          }
        });
      },
    };
  },
};
