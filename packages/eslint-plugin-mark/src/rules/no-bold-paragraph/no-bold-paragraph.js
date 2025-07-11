/**
 * @fileoverview Rule to disallow using fully bolded paragraphs as headings.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("../../core/types.d.ts").RuleModule<{ RuleOptions: RuleOptions, MessageIds: MessageIds }>} RuleModule
 * @typedef {[]} RuleOptions
 * @typedef {'noBoldParagraph'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow using fully bolded paragraphs as headings',
      url: URL_RULE_DOCS('no-bold-paragraph'),

      recommended: true,
      strict: true,
      style: false,
      typography: false,
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
      strong(node) {
        const parentNode = context.sourceCode.getParent(node);
        const ancestorNode = context.sourceCode.getParent(parentNode);

        if (
          parentNode.type === 'paragraph' &&
          ancestorNode.type !== 'listItem' &&
          parentNode.position.start.line === parentNode.position.end.line && // Should be a single line.
          parentNode.position.start.offset === node.position.start.offset && // Should have the same start offset.
          parentNode.position.end.offset === node.position.end.offset // Should have the same end offset.
        ) {
          context.report({
            node,

            messageId: 'noBoldParagraph',
          });
        }
      },
    };
  },
};
