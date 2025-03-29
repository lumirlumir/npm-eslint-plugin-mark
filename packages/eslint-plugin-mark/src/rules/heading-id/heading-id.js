/**
 * @fileoverview Rule to enforce the use of heading IDs.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, getRuleDocsUrl } from '../../core/helpers/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Heading} Heading
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const ruleName = getFileName(import.meta.url);

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      // @ts-expect-error -- TODO: https://github.com/eslint/eslint/issues/19521, https://github.com/eslint/eslint/issues/19523
      name: ruleName,
      recommended: false,
      description: 'Enforce the use of heading IDs',
      url: getRuleDocsUrl(ruleName),
    },

    fixable: 'code',

    schema: [
      {
        enum: ['always', 'never'],
      },
      {
        type: 'object',
        properties: {
          leftDelimiter: {
            type: 'string',
          },
          rightDelimiter: {
            type: 'string',
          },
          ignoreDepth: {
            type: 'array',
            items: {
              enum: [1, 2, 3, 4, 5, 6],
            },
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      'always',
      {
        leftDelimiter: '{',
        rightDelimiter: '}',
        ignoreDepth: [],
      },
    ],

    messages: {
      headingIdAlways: 'Headings should have an ID attribute.',
      headingIdNever:
        'Headings should not have an ID attribute. Remove the `{{ headingId }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      /** @param {Heading} node */
      heading(node) {
        const mode = context.options[0];
        // @ts-expect-error -- TODO
        const { leftDelimiter, rightDelimiter } = context.options[1];

        const regex = new RegExp(
          `${leftDelimiter}#[^${rightDelimiter}]+${rightDelimiter}[ \t]*$`,
        );

        // @ts-expect-error -- TODO: https://github.com/eslint/markdown/issues/323
        const match = context.sourceCode.getText(node).match(regex);

        if (mode === 'always' && match === null) {
          context.report({
            loc: {
              start: {
                line: node.position.start.line,
                column: node.position.end.column,
              },
              end: {
                line: node.position.start.line,
                column: node.position.end.column,
              },
            },

            messageId: 'headingIdAlways',
          });
        } else if (mode === 'never' && match !== null) {
          const headingIdLength = match[0].length;

          const matchIndexStart = match.index;
          const matchIndexEnd = matchIndexStart + headingIdLength;

          context.report({
            loc: {
              start: {
                line: node.position.start.line,
                column: node.position.start.column + matchIndexStart,
              },
              end: {
                line: node.position.start.line,
                column: node.position.start.column + matchIndexEnd,
              },
            },

            data: {
              headingId: match[0],
            },

            messageId: 'headingIdNever',

            fix(fixer) {
              return fixer.replaceTextRange(
                [
                  node.position.start.offset + matchIndexStart,
                  node.position.start.offset + matchIndexEnd,
                ],
                '',
              );
            },
          });
        }
      },
    };
  },
};
