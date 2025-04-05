/**
 * @fileoverview Rule to disallow irregular whitespace.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getRuleDocsUrl } from '../../core/helpers/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("@eslint/core").SourceLocationWithOffset} SourceLocationWithOffset
 * @typedef {import("mdast").Root} Root
 * @typedef {import("mdast").Code} Code
 * @typedef {import("mdast").InlineCode} InlineCode
 *
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const irregularWhitespaceRegex =
  /[\f\v\u0085\ufeff\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000\u2028\u2029]/gu;
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
      description: 'Disallow irregular whitespace',
      url: getRuleDocsUrl('no-irregular-whitespace'),
    },

    schema: [
      {
        type: 'object',
        properties: {
          skipCode: {
            type: 'boolean',
          },
          skipInlineCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: true,
        skipInlineCode: true,
      },
    ],

    messages: {
      noIrregularWhitespace:
        'Irregular whitespace `{{ irregularWhitespace }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    // @ts-expect-error -- TODO
    const [{ skipCode, skipInlineCode }] = context.options;
    const { lines } = context.sourceCode;
    const ignorePositions = []; // Array to store position information of `Code` and `InlineCode`.

    /** @param {number} lineNum @param {number} colNum */
    function isPositionIgnored(lineNum, colNum) {
      return ignorePositions.some(pos => {
        const { start, end } = pos;

        // If any of the following conditions are satisfied, it is located inside the `Code` or `InlineCode` node.
        return (
          (start.line < lineNum && lineNum < end.line) || //  Middle line of a code block.
          (lineNum === start.line && start.column <= colNum) || // After the start column of the start line.
          (lineNum === end.line && colNum < end.column) // Before the end column of the end line.
        );
      });
    }

    return {
      /** @param {Code} node */
      code(node) {
        if (!skipCode) return;

        ignorePositions.push(node.position); // Store position information of `Code`.
      },

      /** @param {InlineCode} node */
      inlineCode(node) {
        if (!skipInlineCode) return;

        ignorePositions.push(node.position); // Store position information of `InlineCode`.
      },

      'root:exit': function () {
        lines.forEach((line, index) => {
          const matches = [...line.matchAll(irregularWhitespaceRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const irregularWhitespaceLength = match[0].length;

              const matchIndexStart = match.index;
              const matchIndexEnd = matchIndexStart + irregularWhitespaceLength;

              const startLineNum = index + indexOffset;
              const startColNum = matchIndexStart + indexOffset;
              const endLineNum = startLineNum;
              const endColNum = matchIndexEnd + indexOffset;

              if (!isPositionIgnored(startLineNum, startColNum)) {
                context.report({
                  loc: {
                    start: {
                      line: startLineNum,
                      column: startColNum,
                    },
                    end: {
                      line: endLineNum,
                      column: endColNum,
                    },
                  },

                  data: {
                    irregularWhitespace: `U+${match[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
                  },

                  messageId: 'noIrregularWhitespace',
                });
              }
            });
          }
        });
      },
    };
  },
};
