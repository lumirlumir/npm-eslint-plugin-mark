/**
 * @fileoverview Rule to disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
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
 * @typedef {[{ leftDoubleQuotationMark: boolean, rightDoubleQuotationMark: boolean, leftSingleQuotationMark: boolean, rightSingleQuotationMark: boolean }]} RuleOptions
 * @typedef {'noCurlyQuote'} MessageIds
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

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow curly quotes(`“`, `”`, `‘` or `’`) in text',
      url: URL_RULE_DOCS('no-curly-quote'),

      recommended: false,
      strict: false,
      style: false,
      typography: true,
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
      noCurlyQuote:
        'Curly quotes(`“`, `”`, `‘` or `’`) are not allowed. Use straight quotes(`"` or `\'`) instead.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      text(node) {
        const textHandler = new TextHandler(context, node);

        const [
          {
            leftDoubleQuotationMark: leftDoubleQuotationMarkOption,
            rightDoubleQuotationMark: rightDoubleQuotationMarkOption,
            leftSingleQuotationMark: leftSingleQuotationMarkOption,
            rightSingleQuotationMark: rightSingleQuotationMarkOption,
          },
        ] = context.options;
        const regexString = [
          leftDoubleQuotationMarkOption ? leftDoubleQuotationMark : '',
          rightDoubleQuotationMarkOption ? rightDoubleQuotationMark : '',
          leftSingleQuotationMarkOption ? leftSingleQuotationMark : '',
          rightSingleQuotationMarkOption ? rightSingleQuotationMark : '',
        ].join('');

        if (!regexString) return;

        textHandler.lines.forEach(textLineNode => {
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

                messageId: 'noCurlyQuote',

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
