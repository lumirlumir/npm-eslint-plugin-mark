/**
 * @fileoverview Rule to disallow double or multiple consecutive spaces in text, except for leading and trailing spaces.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

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
// Helpers
// --------------------------------------------------------------------------------

const doubleSpacesRegex = /(?<! ) {2}(?! )/g; // Exactly two spaces. No more, no less.
const multipleSpacesRegex = /(?<! ) {2,}(?! )/g; // More than two spaces.
const leadingSpacesRegex = /^ */;
const singleSpace = ' ';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description:
        'Disallow double or multiple consecutive spaces in text, except for leading and trailing spaces',
      url: getRuleDocsUrl('no-double-spaces'),
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          multipleSpaces: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        multipleSpaces: false,
      },
    ],

    messages: {
      noDoubleSpaces:
        'Double spaces are not allowed except for leading and trailing spaces.',
      noMultipleSpaces:
        'Multiple spaces are not allowed except for leading and trailing spaces.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      /** @param {TextExt} node */
      text(node) {
        textHandler(context, node);

        // @ts-expect-error -- TODO
        const { multipleSpaces } = context.options[0];
        const spacesRegex = multipleSpaces ? multipleSpacesRegex : doubleSpacesRegex;
        const messageId = multipleSpaces ? 'noMultipleSpaces' : 'noDoubleSpaces';

        node.children.forEach(textLineNode => {
          const matches = [...textLineNode.value.trim().matchAll(spacesRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const spacesLength = match[0].length;
              const leadingSpacesLength =
                textLineNode.value.match(leadingSpacesRegex)[0].length;

              const matchIndexStart = match.index + leadingSpacesLength;
              const matchIndexEnd = matchIndexStart + spacesLength;

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

                messageId,

                fix(fixer) {
                  return fixer.replaceTextRange(
                    [
                      textLineNode.position.start.offset + matchIndexStart,
                      textLineNode.position.start.offset + matchIndexEnd,
                    ],
                    singleSpace,
                  );
                },
              });
            });
          }
        });
      },
    };
  },
};
