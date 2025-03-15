/**
 * @fileoverview Rule to disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
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

const leftDoubleQuotationMark = '\u201C'; // `“`
const rightDoubleQuotationMark = '\u201D'; // `”`
const leftSingleQuotationMark = '\u2018'; // `‘`
const rightSingleQuotationMark = '\u2019'; // `’`
const doubleStraightQuote = '"';
const singleStraightQuote = "'";

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
      description: 'Disallow curly quotes(`“`, `”`, `‘` or `’`) in text',
      url: 'https://github.com/lumirlumir/npm-eslint-plugin-mark',
    },

    fixable: 'code',

    messages: {
      noCurlyQuotes:
        'Curly quotes(`“`, `”`, `‘` or `’`) are not allowed. Use straight quotes(`"` or `\'`) instead.',
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
          const matches = [
            ...textLineNode.value.matchAll(
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

                messageId: 'noCurlyQuotes',

                fix(fixer) {
                  return fixer.replaceTextRange(
                    [
                      textLineNode.position.start.offset + matchIndexStart,
                      textLineNode.position.start.offset + matchIndexEnd,
                    ],
                    [leftDoubleQuotationMark, rightDoubleQuotationMark].includes(match[0])
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
