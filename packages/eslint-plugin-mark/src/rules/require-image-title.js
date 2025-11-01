/**
 * @fileoverview Rule to enforce the use of title attribute for images.
 * @author 루밀LuMir(lumirlumir)
 */

// TODO: allow option

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getElementsByTagName } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { Definition } from 'mdast'
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
    const { sourceCode } = context;

    /** @type {Set<string>} */
    const imageReferenceIdentifiers = new Set();
    /** @type {Set<Definition>} */
    const definitions = new Set();

    /** @param {Position} loc */
    function report(loc) {
      context.report({
        loc,
        messageId: 'requireImageTitle',
      });
    }

    return {
      image(node) {
        if (!node.title) report(sourceCode.getLoc(node));
      },

      html(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);

        getElementsByTagName(node.value, 'img').forEach(
          ({ attrs, sourceCodeLocation }) => {
            let hasTitle = false;

            for (const { name, value } of attrs) {
              if (name === 'title' && value) {
                hasTitle = true;
              }
            }

            if (!hasTitle && sourceCodeLocation) {
              report({
                start: sourceCode.getLocFromIndex(
                  nodeStartOffset + sourceCodeLocation.startOffset,
                ),
                end: sourceCode.getLocFromIndex(
                  nodeStartOffset + sourceCodeLocation.endOffset,
                ),
              });
            }
          },
        );
      },

      imageReference(node) {
        imageReferenceIdentifiers.add(node.identifier);
      },

      definition(node) {
        definitions.add(node);
      },

      'root:exit'() {
        for (const definition of definitions) {
          if (imageReferenceIdentifiers.has(definition.identifier) && !definition.title) {
            report(sourceCode.getLoc(definition));
          }
        }
      },
    };
  },
};
