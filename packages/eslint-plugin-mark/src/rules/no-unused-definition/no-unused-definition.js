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
 * @typedef {import("../../core/types.d.ts").RuleModule<{ RuleOptions: RuleOptions, MessageIds: MessageIds }>} RuleModule
 * @typedef {[]} RuleOptions
 * @typedef {'noUnusedDefinition'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow unused definitions',
      url: URL_RULE_DOCS('no-unused-definition'),

      recommended: true,
      strict: true,
      style: false,
      typography: false,
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
      imageReference(node) {
        refDefHandler.push(node);
      },

      linkReference(node) {
        refDefHandler.push(node);
      },

      definition(node) {
        refDefHandler.push(node);
      },

      'root:exit'() {
        refDefHandler.getUnusedDefinitions().forEach(definition => {
          context.report({
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
