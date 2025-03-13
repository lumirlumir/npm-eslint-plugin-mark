/**
 * @fileoverview Rule to disallow double spaces in text, except for leading and trailing spaces.
 * @author 루밀LuMir(lumirlumir)
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

const doubleSpacesRegex = /(?<! ) {2}(?! )/g; // Exactly two spaces. No more, no less.
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
        const isSingleLine = node.position.start.line === node.position.end.line;

        if (isSingleLine) {
          const matches = [...node.value.matchAll(doubleSpacesRegex)];

          if (matches.length === 0) return;

          matches.forEach((match, matchCount, matchArray) => {
            const doubleSpacesLength = match[0].length;

            const matchIndexStart = match.index;
            const matchIndexEnd = matchIndexStart + doubleSpacesLength;

            const locLine = node.position.start.line;
            /** @param {number} matchIndex */
            const locColumn = matchIndex => node.position.start.column + matchIndex;

            /**
             * The ESLint plugin detects and reports all double spaces but performs the actual fix only on the last match.
             * This optimized approach efficiently replaces all double spaces in a single operation.
             */
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
                return (
                  matchCount === matchArray.length - 1 &&
                  fixer.replaceText(
                    node,
                    node.value.replace(doubleSpacesRegex, singleSpace),
                  )
                );
              },
            });
          });
        }
      },
    };
  },
};
