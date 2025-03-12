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
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const doubleSpacesRegex = /(?<! ) {2}(?! )/g; // Exactly two spaces. no more, no less.
const leadingSpacesRegex = /^ */;
const trailingSpacesRegex = / *$/;

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
      text(node) {
        const trimmedValue = node.value.trim();

        if (trimmedValue.match(doubleSpacesRegex)) {
          context.report({
            loc: node.position,
            messageId: 'noDoubleSpaces',
            fix(fixer) {
              const leadingSpaces = node.value.match(leadingSpacesRegex)[0];
              const trailingSpaces = node.value.match(trailingSpacesRegex)[0];
              const fixedDoubleSpaces = trimmedValue.replaceAll(doubleSpacesRegex, ' ');

              return fixer.replaceText(
                node,
                `${leadingSpaces}${fixedDoubleSpaces}${trailingSpaces}`,
              );
            },
          });
        }
      },
    };
  },
};
