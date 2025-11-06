/**
 * @fileoverview Rule to enforce the use of title attribute for links.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { normalizeIdentifier } from 'micromark-util-normalize-identifier';
import { getElementsByTagName } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { Definition } from 'mdast'
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ allowDefinitions: string[] }]} RuleOptions
 * @typedef {'requireLinkTitle'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of title attribute for links',
      url: URL_RULE_DOCS('require-link-title'),
      recommended: false,
      stylistic: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowDefinitions: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allowDefinitions: ['//'],
      },
    ],

    messages: {
      requireLinkTitle: 'Links should have a title attribute.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const allowDefinitions = new Set(
      context.options[0].allowDefinitions.map(identifier =>
        normalizeIdentifier(identifier).toLowerCase(),
      ),
    );

    /** @type {Set<string>} */
    const linkReferenceIdentifiers = new Set();
    /** @type {Set<Definition>} */
    const definitions = new Set();

    /** @param {Position} loc */
    function report(loc) {
      context.report({
        loc,
        messageId: 'requireLinkTitle',
      });
    }

    return {
      link(node) {
        // TODO: Detect auto-link literals like
        // `<https://example.com>` or `https://example.com`

        if (!node.title) report(sourceCode.getLoc(node));
      },

      html(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const html = sourceCode.getText(node);

        getElementsByTagName(html, 'a').forEach(({ attrs, sourceCodeLocation }) => {
          let hasTitle = false;

          for (const { name, value } of attrs) {
            if (name === 'title' && value) {
              hasTitle = true;
              break;
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
        });
      },

      linkReference(node) {
        linkReferenceIdentifiers.add(node.identifier);
      },

      definition(node) {
        if (allowDefinitions.has(node.identifier)) return;

        definitions.add(node);
      },

      'root:exit'() {
        for (const definition of definitions) {
          if (linkReferenceIdentifiers.has(definition.identifier) && !definition.title) {
            report(sourceCode.getLoc(definition));
          }
        }
      },
    };
  },
};
