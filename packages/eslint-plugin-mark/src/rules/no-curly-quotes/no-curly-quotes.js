/**
 * @fileoverview Rule to disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
 * @author 루밀LuMir(lumirlumir)
 */

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

const leftDoubleQuotationMark = '\u201C'; // `“`
const rightDoubleQuotationMark = '\u201D'; // `”`
const leftSingleQuotationMark = '\u2018'; // `‘`
const rightSingleQuotationMark = '\u2019'; // `’`
const doubleStraightQuote = '"';
const singleStraightQuote = "'";

const newLineRegex = /\r?\n/;
const indexOffset = 1;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description: 'Disallow curly quotes(`“`, `”`, `‘` or `’`) in text',
      url: 'https://github.com/lumirlumir/npm-eslint-plugin-mark',
    },

    fixable: 'code',

    messages: {
      noCurlyQuotes:
        'Curly quotes(`“`, `”`, `‘` or `’`) are not allowed. Use straight quotes(`"` or `\'`) instead.',
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
         */ // @ts-ignore -- TODO: https://github.com/eslint/markdown/issues/323
        const lines = context.sourceCode.getText(node).split(newLineRegex);

        lines.forEach((line, lineNumber) => {
          const matches = [
            ...line.matchAll(
              new RegExp(
                `[${leftDoubleQuotationMark}${rightDoubleQuotationMark}${leftSingleQuotationMark}${rightSingleQuotationMark}]`,
                'g',
              ),
            ),
          ];

          if (matches.length > 0) {
            matches.forEach(match => {
              const curlyQuoteLength = match[0].length;

              const matchIndexStart = match.index;
              const matchIndexEnd = matchIndexStart + curlyQuoteLength;

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

                messageId: 'noCurlyQuotes',

                fix(fixer) {
                  return fixer.replaceTextRange(
                    [rangeStart, rangeEnd],
                    match[0] === leftDoubleQuotationMark ||
                      match[0] === rightDoubleQuotationMark
                      ? doubleStraightQuote
                      : singleStraightQuote,
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
