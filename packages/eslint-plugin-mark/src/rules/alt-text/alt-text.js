/**
 * @fileoverview Rule to enforce the use of alternative text for images.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("../../core/types.d.ts").RuleModule<{ RuleOptions: RuleOptions, MessageIds: MessageIds }>} RuleModule
 * @typedef {[]} RuleOptions
 * @typedef {'altText'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of alternative text for images',
      url: URL_RULE_DOCS('alt-text'),

      recommended: true,
      strict: true,
      style: false,
      typography: false,
    },

    messages: {
      altText: 'Images should have an alternative text (alt text).',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      image(node) {
        if (node.alt === '') {
          context.report({
            node,
            messageId: 'altText',
          });
        }
      },

      imageReference(node) {
        if (node.alt === '') {
          context.report({
            node,
            messageId: 'altText',
          });
        }
      },

      html(node) {
        const $ = cheerio.load(node.value);

        $('img').each((_, elem) => {
          if (!elem.attribs.alt) {
            context.report({
              node,
              messageId: 'altText',
            });
          }
        });
      },
    };
  },
};
