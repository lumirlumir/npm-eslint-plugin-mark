/**
 * @fileoverview Rule to disallow double spaces in text, except for leading and trailing spaces.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName } from '../../core/helpers/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Text} Text
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const doubleSpacesRegex = /(?<! ) {2}(?! )/g; // Exactly two spaces. No more, no less.
const leadingSpacesRegex = /^ */;
const newLineRegex = /\r?\n/;
const singleSpace = ' ';
const indexOffset = 1; // `index` is 0-based, but `column` is 1-based.

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
      /** @param {Text} node */
      text(node) {
        /**
         * - Supports both LF and CRLF line endings.
         * - In JavaScript, `"\n"` represents a newline character and splits text accordingly.
         *   However, in Markdown, writing `abcd\ndefg` treats `\n` as plain text (backslash + 'n'), not a newline.
         *   Only actual line breaks in Markdown (`abcd↵defg`) are stored as `"\n"` and split properly.
         */ // @ts-ignore -- TODO: https://github.com/eslint/markdown/issues/323
        const lines = context.sourceCode.getText(node).split(newLineRegex);

        lines.forEach((line, lineNumber) => {
          const matches = [...line.trim().matchAll(doubleSpacesRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const doubleSpacesLength = match[0].length;
              const leadingSpacesLength = line.match(leadingSpacesRegex)[0].length;

              const matchIndexStart = match.index + leadingSpacesLength;
              const matchIndexEnd = matchIndexStart + doubleSpacesLength;

              /** Current node's start line + relative line number */
              const locLine = node.position.start.line + lineNumber;
              /**
               * Consider the starting column position for the first line, otherwise calculate from the start of the line
               * @param {number} matchIndex
               */
              const locColumn = matchIndex =>
                lineNumber === 0
                  ? node.position.start.column + matchIndex
                  : indexOffset + matchIndex;

              /** Calculating the start position of double spaces (offset-based) */
              let positionOffset = node.position.start.offset;

              for (let i = 0; i < lineNumber; i++) {
                positionOffset += lines[i].length + 1; // Add the lengths of previous lines (`+1` for the newline character)
              }

              const rangeStart = positionOffset + matchIndexStart;
              const rangeEnd = positionOffset + matchIndexEnd;

              context.report({
                loc: {
                  start: {
                    line: locLine,
                    column: locColumn(matchIndexStart),
                  },
                  end: {
                    line: locLine,
                    column: locColumn(matchIndexEnd),
                  },
                },

                messageId: 'noDoubleSpaces',

                fix(fixer) {
                  return fixer.replaceTextRange([rangeStart, rangeEnd], singleSpace);
                },
              });
            });
          }
        });
      },
    };
  },
};
