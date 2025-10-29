/**
 * @fileoverview Rule to enforce the use of title attribute for images.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getElementsByTagName, ReferenceDefinitionHandler } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Image, ImageReference, Definition, Html } from 'mdast'
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[]} RuleOptions
 * @typedef {'requireImageTitle'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of title attribute for images',
      url: URL_RULE_DOCS('require-image-title'),
      recommended: false,
      stylistic: false,
    },

    messages: {
      requireImageTitle: 'Images should have a title attribute.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const refDefHandler = new ReferenceDefinitionHandler();

    /** @param {Image | ImageReference | Definition | Html} node */
    function report(node) {
      context.report({
        node,
        messageId: 'requireImageTitle',
      });
    }

    return {
      image(node) {
        if (!node.title) report(node);
      },

      html(node) {
        getElementsByTagName(node.value, 'img').forEach(({ attrs }) => {
          let hasTitle = false;

          attrs.forEach(({ name, value }) => {
            if (name === 'title' && value) {
              hasTitle = true;
            }
          });

          if (!hasTitle) {
            report(node);
          }
        });
      },

      imageReference(node) {
        refDefHandler.push(node);
      },

      definition(node) {
        refDefHandler.push(node);
      },

      'root:exit'() {
        refDefHandler.getImageDefinitions().forEach(definition => {
          if (!definition.title) report(definition);
        });
      },
    };
  },
};
