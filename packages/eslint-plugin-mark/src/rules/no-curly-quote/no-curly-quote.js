/**
 * @fileoverview Rule to disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../../core/types.js';
 * @typedef {[{ checkLeftDoubleQuotationMark: boolean, checkRightDoubleQuotationMark: boolean, checkLeftSingleQuotationMark: boolean, checkRightSingleQuotationMark: boolean }]} RuleOptions
 * @typedef {'noCurlyQuote'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
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
          checkLeftDoubleQuotationMark: {
            type: 'boolean',
          },
          checkRightDoubleQuotationMark: {
            type: 'boolean',
          },
          checkLeftSingleQuotationMark: {
            type: 'boolean',
          },
          checkRightSingleQuotationMark: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkLeftDoubleQuotationMark: true,
        checkRightDoubleQuotationMark: true,
        checkLeftSingleQuotationMark: true,
        checkRightSingleQuotationMark: true,
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
    const { sourceCode } = context;
    const [
      {
        checkLeftDoubleQuotationMark,
        checkRightDoubleQuotationMark,
        checkLeftSingleQuotationMark,
        checkRightSingleQuotationMark,
      },
    ] = context.options;
    const regexString = [
      checkLeftDoubleQuotationMark ? leftDoubleQuotationMark : '',
      checkRightDoubleQuotationMark ? rightDoubleQuotationMark : '',
      checkLeftSingleQuotationMark ? leftSingleQuotationMark : '',
      checkRightSingleQuotationMark ? rightSingleQuotationMark : '',
    ].join('');

    return {
      text(node) {
        if (regexString === '') {
          return;
        }

        const [nodeStartOffset] = sourceCode.getRange(node);
        const matches = sourceCode
          .getText(node)
          .matchAll(new RegExp(`[${regexString}]`, 'g'));

        for (const match of matches) {
          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + match[0].length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noCurlyQuote',

            fix(fixer) {
              return fixer.replaceTextRange(
                [startOffset, endOffset],
                [leftDoubleQuotationMark, rightDoubleQuotationMark].includes(match[0])
                  ? doubleQuotationMark
                  : singleQuotationMark,
              );
            },
          });
        }
      },
    };
  },
};
