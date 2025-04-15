/**
 * @fileoverview Rule to disallow control character.
 * @author 루밀LuMir(lumirlumir)
 */

/* eslint-disable no-control-regex -- Needed for rule definition. */

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

const controlCharacterRegex =
  /[\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u000b\u000c\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f\u007f\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008a\u008b\u008c\u008d\u008e\u008f\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009a\u009b\u009c\u009d\u009e\u009f\u202c\u202d\u202e]/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description: 'Disallow control character',
      url: URL_RULE_DOCS('no-control-character'),
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
      noControlCharacter: 'Control character `{{ controlCharacter }}` is not allowed.',
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
          const matches = [...line.matchAll(controlCharacterRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const controlCharacterLength = match[0].length;

              const matchIndexStart = match.index;
              const matchIndexEnd = matchIndexStart + controlCharacterLength;

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
                  controlCharacter: `U+${match[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
                },

                messageId: 'noControlCharacter',
              });
            });
          }
        });
      },
    };
  },
};
