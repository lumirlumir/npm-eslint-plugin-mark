/**
 * @fileoverview Rule to disallow using fully bolded paragraphs as headings.
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
 * @typedef {import("mdast").Strong} Strong
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description: 'Disallow using fully bolded paragraphs as headings',
      url: getRuleDocsUrl('no-bold-paragraph'),
    },

    messages: {
      noBoldParagraph:
        'Fully bolded paragraphs should not be used as headings. Please use a heading instead.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      /** @param {Strong} node */
      strong(node) {
        // @ts-expect-error -- TODO
        const parentNode = context.sourceCode.getParent(node);
        // @ts-expect-error -- TODO
        const ancestorNode = context.sourceCode.getParent(parentNode);

        if (
          parentNode.type === 'paragraph' &&
          ancestorNode.type !== 'listItem' &&
          parentNode.position.start.line === parentNode.position.end.line && // Should be a single line.
          parentNode.position.start.offset === node.position.start.offset && // Should have the same start offset.
          parentNode.position.end.offset === node.position.end.offset // Should have the same end offset.
        ) {
          context.report({
            // @ts-expect-error -- TODO
            node,

            messageId: 'noBoldParagraph',
          });
        }
      },
    };
  },
};
