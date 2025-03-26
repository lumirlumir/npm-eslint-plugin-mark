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

    messages: {
      headingId: 'Headings should have an ID attribute.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      /** @param {Heading} node */
      heading(node) {
        const regex = /{#[^}]+}[ \t]*$/g;

        // @ts-expect-error -- TODO: https://github.com/eslint/markdown/issues/323
        const matches = [...context.sourceCode.getText(node).matchAll(regex)];

        if (matches.length === 0) {
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

            messageId: 'headingId',
          });
        }
      },
    };
  },
};
