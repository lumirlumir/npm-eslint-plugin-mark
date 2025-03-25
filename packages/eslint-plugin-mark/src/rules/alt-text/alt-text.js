/**
 * @fileoverview Rule to enforce the use of alternative text for images.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import { getFileName, getRuleDocsUrl } from '../../core/helpers/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Image} Image
 * @typedef {import("mdast").ImageReference} ImageReference
 * @typedef {import("mdast").Html} Html
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
      // @ts-ignore -- TODO: https://github.com/eslint/eslint/issues/19521, https://github.com/eslint/eslint/issues/19523
      name: ruleName,
      recommended: true,
      description: 'Enforce the use of alternative text for images',
      url: getRuleDocsUrl(ruleName),
    },

    messages: {
      altText: 'Images should have an alternative text (alt text).',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      /** @param {Image} node */
      image(node) {
        if (node.alt === '') {
          context.report({
            // @ts-ignore -- TODO
            node,
            messageId: 'altText',
          });
        }
      },

      /** @param {ImageReference} node */
      imageReference(node) {
        if (node.alt === '') {
          context.report({
            // @ts-ignore -- TODO
            node,
            messageId: 'altText',
          });
        }
      },

      /** @param {Html} node */
      html(node) {
        const $ = cheerio.load(node.value);

        $('img').each((_, elem) => {
          if (!elem.attribs.alt) {
            context.report({
              // @ts-ignore -- TODO
              node,
              messageId: 'altText',
            });
          }
        });
      },
    };
  },
};
