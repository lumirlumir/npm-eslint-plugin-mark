/**
 * @fileoverview Rule to disallow irregular dash.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { IgnoredPositions } from '../../core/ast/index.js';
import { URL_RULE_DOCS, ZERO_TO_ONE_BASED_OFFSET } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Code} Code
 * @typedef {import("mdast").InlineCode} InlineCode
 * @typedef {import("unist").Position} Position
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const irregularDashRegex =
  /[\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2212\u23af\u2e3a\u2e3b\u30fc\ufe58\ufe63\uff0d]/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description: 'Disallow irregular dash',
      url: URL_RULE_DOCS('no-irregular-dash'),
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
      noIrregularDash: 'Irregular dash `{{ irregularDash }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    // @ts-expect-error -- TODO
    const [{ skipCode, skipInlineCode }] = context.options;
    const { lines } = context.sourceCode;

    const ignoredPositions = new IgnoredPositions();

    return {
      /** @param {Code} node */
      code(node) {
        if (skipCode) ignoredPositions.push(node.position); // Store position information of `Code`.
      },

      /** @param {InlineCode} node */
      inlineCode(node) {
        if (skipInlineCode) ignoredPositions.push(node.position); // Store position information of `InlineCode`.
      },

      'root:exit'() {
        lines.forEach((line, lineIndex) => {
          const matches = [...line.matchAll(irregularDashRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const irregularDashLength = match[0].length;

              const matchIndexStart = match.index;
              const matchIndexEnd = matchIndexStart + irregularDashLength;

              /** @type {Position} */
              const loc = {
                start: {
                  line: lineIndex + ZERO_TO_ONE_BASED_OFFSET,
                  column: matchIndexStart + ZERO_TO_ONE_BASED_OFFSET,
                },
                end: {
                  line: lineIndex + ZERO_TO_ONE_BASED_OFFSET,
                  column: matchIndexEnd + ZERO_TO_ONE_BASED_OFFSET,
                },
              };

              if (ignoredPositions.isIgnoredPosition(loc)) return;

              context.report({
                loc,

                data: {
                  irregularDash: `U+${match[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
                },

                messageId: 'noIrregularDash',
              });
            });
          }
        });
      },
    };
  },
};
