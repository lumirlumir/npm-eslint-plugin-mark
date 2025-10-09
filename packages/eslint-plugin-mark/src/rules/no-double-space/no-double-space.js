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

const doubleSpaceRegex = /(?<=[^ \r\n]) {2}(?=[^ \r\n])/g; // Exactly two spaces. No more, no less.
const multipleSpaceRegex = /(?<=[^ \r\n]) {2,}(?=[^ \r\n])/g; // More than two spaces.
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
    const { sourceCode } = context;
    const [{ checkMultipleSpace }] = context.options;

    const spaceRegex = checkMultipleSpace ? multipleSpaceRegex : doubleSpaceRegex;
    const messageId = checkMultipleSpace ? 'noMultipleSpace' : 'noDoubleSpace';

    return {
      text(node) {
        const textHandler = new TextHandler(context, node);

        textHandler.lines.forEach(textLineNode => {
          const matches = textLineNode.value.matchAll(spaceRegex);

          for (const match of matches) {
            const startOffset = match.index + textLineNode.position.start.offset;
            const endOffset = startOffset + match[0].length;

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
