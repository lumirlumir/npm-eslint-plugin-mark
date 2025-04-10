/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
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
 * @typedef {import("mdast").Text} Text
 * @typedef {import("mdast").Heading} Heading
 * @typedef {import("mdast").Paragraph} Paragraph
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const lowercaseRegex = /^[a-z]/u;

/**
 * Traverses the Markdown AST using a DFS pre-order approach to find the first text node.
 * @param {any} node
 * @returns {Text | null}
 */
function findFirstLeafTextNode(node) {
  // Base case: if this is a text node, return it
  if (node.type === 'text') return node;

  // Check if node has children to traverse
  if (node.children && node.children.length > 0)
    // Iterate through children in order
    for (const child of node.children) {
      const textNode = findFirstLeafTextNode(child);
      // Return the first text node found in the subtree
      if (textNode) return textNode;
    }

  // No text node found in this subtree
  return null;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description: 'Enforce the use of capital letters at the beginning of sentences',
      url: getRuleDocsUrl('en-capitalization'),
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          skipHeading: {
            type: 'boolean',
          },
          skipListItem: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipHeading: true,
        skipListItem: true,
      },
    ],

    messages: {
      enCapitalization: '`{{ lowercase }}` should be capitalized.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    /** @param {Heading | Paragraph} node */
    function report(node) {
      const textNode = findFirstLeafTextNode(node);

      if (!textNode) return;

      const match = textNode.value.match(lowercaseRegex);

      if (!match) return;

      const lowercase = match[0];

      context.report({
        loc: {
          start: {
            line: textNode.position.start.line,
            column: textNode.position.start.column,
          },
          end: {
            line: textNode.position.start.line,
            column: textNode.position.start.column + lowercase.length,
          },
        },

        data: {
          lowercase: match[0],
        },

        messageId: 'enCapitalization',

        fix(fixer) {
          return fixer.replaceTextRange(
            [
              textNode.position.start.offset,
              textNode.position.start.offset + lowercase.length,
            ],
            lowercase.toUpperCase(),
          );
        },
      });
    }

    // @ts-expect-error -- TODO
    const [{ skipHeading, skipListItem }] = context.options;

    return {
      /** @param {Paragraph} node */
      paragraph(node) {
        // @ts-expect-error -- TODO
        if (context.sourceCode.getParent(node).type === 'listItem' && skipListItem)
          return;

        report(node);
      },

      /** @param {Heading} node */
      heading(node) {
        if (skipHeading) return;

        report(node);
      },
    };
  },
};
