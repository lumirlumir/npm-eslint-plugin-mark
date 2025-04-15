/**
 * @fileoverview Rule to disallow unused definitions.
 * @author 루밀LuMir(lumirlumir)
 */

// TODO: Add options to ignore definition style comments.

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ReferenceDefinitionHandler } from '../../core/ast/index.js';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").ImageReference} ImageReference
 * @typedef {import("mdast").LinkReference} LinkReference
 * @typedef {import("mdast").Definition} Definition
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
      description: 'Disallow unused definitions',
      url: URL_RULE_DOCS('no-unused-definition'),
    },

    messages: {
      noUnusedDefinition: 'Definition `{{ definition }}` is defined but never used.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const refDefHandler = new ReferenceDefinitionHandler();

    return {
      /** @param {ImageReference} node */
      imageReference(node) {
        refDefHandler.push(node);
      },

      /** @param {LinkReference} node */
      linkReference(node) {
        refDefHandler.push(node);
      },

      /** @param {Definition} node */
      definition(node) {
        refDefHandler.push(node);
      },

      'root:exit'() {
        refDefHandler.getUnusedDefinitions().forEach(definition => {
          context.report({
            // @ts-expect-error -- TODO
            node: definition,

            data: {
              definition: definition.identifier,
            },

            messageId: 'noUnusedDefinition',
          });
        });
      },
    };
  },
};
