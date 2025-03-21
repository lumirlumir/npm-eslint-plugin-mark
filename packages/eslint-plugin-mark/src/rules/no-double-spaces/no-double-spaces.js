/**
 * @fileoverview Rule to disallow double spaces in text, except for leading and trailing spaces.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { textHandler } from '../../core/ast/index.js';
import { getFileName } from '../../core/helpers/index.js';

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
      // @ts-ignore -- TODO: https://github.com/eslint/eslint/issues/19521, https://github.com/eslint/eslint/issues/19523
      name: getFileName(import.meta.url),
      recommended: true,
      description:
        'Disallow double spaces in text, except for leading and trailing spaces',
      url: 'https://github.com/lumirlumir/npm-eslint-plugin-mark',
    },

    fixable: 'whitespace',

    messages: {
      noDoubleSpaces:
        'Double spaces are not allowed except for leading and trailing spaces.',
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
          const matches = [...textLineNode.value.trim().matchAll(doubleSpacesRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const doubleSpacesLength = match[0].length;
              const leadingSpacesLength =
                textLineNode.value.match(leadingSpacesRegex)[0].length;

              const matchIndexStart = match.index + leadingSpacesLength;
              const matchIndexEnd = matchIndexStart + doubleSpacesLength;

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

                messageId: 'noDoubleSpaces',

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
