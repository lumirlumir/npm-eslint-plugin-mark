/**
 * @fileoverview Rule to disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
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

const leftDoubleQuotationMark = '\u201C'; // `“`
const rightDoubleQuotationMark = '\u201D'; // `”`
const leftSingleQuotationMark = '\u2018'; // `‘`
const rightSingleQuotationMark = '\u2019'; // `’`
const doubleQuotationMark = '"';
const singleQuotationMark = "'";

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
      url: getRuleDocsUrl('no-curly-quotes'),
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          leftDoubleQuotationMark: {
            type: 'boolean',
          },
          rightDoubleQuotationMark: {
            type: 'boolean',
          },
          leftSingleQuotationMark: {
            type: 'boolean',
          },
          rightSingleQuotationMark: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        leftDoubleQuotationMark: true,
        rightDoubleQuotationMark: true,
        leftSingleQuotationMark: true,
        rightSingleQuotationMark: true,
      },
    ],

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

        const {
          // @ts-expect-error -- TODO
          leftDoubleQuotationMark: leftDoubleQuotationMarkOption,
          // @ts-expect-error -- TODO
          rightDoubleQuotationMark: rightDoubleQuotationMarkOption,
          // @ts-expect-error -- TODO
          leftSingleQuotationMark: leftSingleQuotationMarkOption,
          // @ts-expect-error -- TODO
          rightSingleQuotationMark: rightSingleQuotationMarkOption,
        } = context.options[0];
        const regexString = [
          leftDoubleQuotationMarkOption ? leftDoubleQuotationMark : '',
          rightDoubleQuotationMarkOption ? rightDoubleQuotationMark : '',
          leftSingleQuotationMarkOption ? leftSingleQuotationMark : '',
          rightSingleQuotationMarkOption ? rightSingleQuotationMark : '',
        ].join('');

        if (!regexString) return;

        node.children.forEach(textLineNode => {
          const matches = [
            ...textLineNode.value.matchAll(new RegExp(`[${regexString}]`, 'g')),
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
                      ? doubleQuotationMark
                      : singleQuotationMark,
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
