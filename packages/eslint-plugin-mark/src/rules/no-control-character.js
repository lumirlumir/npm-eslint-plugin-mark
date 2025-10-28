/**
 * @fileoverview Rule to disallow control character.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { IgnoredPositions } from '../core/ast/index.js';
import { URL_RULE_DOCS, ZERO_TO_ONE_BASED_OFFSET } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ skipCode: boolean, skipInlineCode: boolean }]} RuleOptions
 * @typedef {'noControlCharacter'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const controlCharacterRegex = // eslint-disable-next-line no-control-regex -- Needed for rule definition.
  /[\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u000b\u000c\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f\u007f\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008a\u008b\u008c\u008d\u008e\u008f\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009a\u009b\u009c\u009d\u009e\u009f\u202c\u202d\u202e]/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow control character',
      url: URL_RULE_DOCS('no-control-character'),
      recommended: true,
      stylistic: false,
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
    const { sourceCode } = context;
    const [{ skipCode, skipInlineCode }] = context.options;

    const ignoredPositions = new IgnoredPositions();

    return {
      code(node) {
        if (skipCode) ignoredPositions.push(node.position); // Store position information of `Code`.
      },

      inlineCode(node) {
        if (skipInlineCode) ignoredPositions.push(node.position); // Store position information of `InlineCode`.
      },

      'root:exit'() {
        sourceCode.lines.forEach((line, lineIndex) => {
          const matches = line.matchAll(controlCharacterRegex);

          for (const match of matches) {
            const controlCharacter = match[0];

            const matchIndexStart = match.index;
            const matchIndexEnd = matchIndexStart + controlCharacter.length;

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
                controlCharacter: `U+${controlCharacter.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`,
              },

              messageId: 'noControlCharacter',
            });
          }
        });
      },
    };
  },
};
