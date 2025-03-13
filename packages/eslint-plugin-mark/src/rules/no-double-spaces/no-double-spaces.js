/**
 * @fileoverview Rule to disallow double spaces in text, except for leading and trailing spaces.
 * @author 루밀LuMir(lumirlumir)
 * @see doubleSpacesRegex https://regexr.com/8d27p
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * @typedef {import("mdast").Text} Text
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const newLineRegex = /\r?\n/;
const doubleSpacesRegex = /(?<! ) {2}(?! )/g; // Exactly two spaces. no more, no less.
const leadingSpacesRegex = /^ */;
const trailingSpacesRegex = / *$/;
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
         */
        const lines = node.value.split(newLineRegex);

        lines.forEach((line, lineNumber) => {
          const matches = [...line.trim().matchAll(doubleSpacesRegex)]; // Remove leading and trailing spaces

          if (matches.length > 0) {
            matches.forEach(match => {
              const doubleSpaceslength = match[0].length;
              const leadingSpacesLength = line.match(leadingSpacesRegex)[0].length;

              const matchIndexStart = leadingSpacesLength + match.index; // `match.index` does not include leading spaces
              const matchIndexEnd = matchIndexStart + doubleSpaceslength;

              /**
               * Current node's start line + relative line number
               */
              const locLine = node.position.start.line + lineNumber;
              /**
               * Consider the starting column position for the first line, otherwise calculate from the start of the line
               * @param {number} matchIndex
               */
              const locColumn = matchIndex =>
                lineNumber === 0
                  ? node.position.start.column + matchIndex
                  : indexOffset + matchIndex;

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
                  const leadingSpaces = node.value.match(leadingSpacesRegex)[0];
                  const trailingSpaces = node.value.match(trailingSpacesRegex)[0];
                  const fixedDoubleSpaces = node.value
                    .trim()
                    .replaceAll(doubleSpacesRegex, singleSpace);

                  return fixer.replaceText(
                    node,
                    `${leadingSpaces}${fixedDoubleSpaces}${trailingSpaces}`,
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
