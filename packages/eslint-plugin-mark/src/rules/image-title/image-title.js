/**
 * @fileoverview Rule to enforce the use of title attribute for images.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import { ReferenceDefinitionHandler } from '../../core/ast/index.js';
import { URL_RULE_DOCS } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Image} Image
 * @typedef {import("mdast").ImageReference} ImageReference
 * @typedef {import("mdast").Definition} Definition
 * @typedef {import("mdast").Html} Html
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: false,
      description: 'Enforce the use of title attribute for images',
      url: URL_RULE_DOCS('image-title'),
    },

    messages: {
      imageTitle: 'Images should have a title attribute.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const refDefHandler = new ReferenceDefinitionHandler();

    /** @param {Image | ImageReference | Definition | Html} node */
    function report(node) {
      context.report({
        // @ts-expect-error -- TODO
        node,
        messageId: 'imageTitle',
      });
    }

    return {
      /** @param {Image} node */
      image(node) {
        if (!node.title) report(node);
      },

      /** @param {Html} node */
      html(node) {
        const $ = cheerio.load(node.value);

        $('img').each((_, elem) => {
          if (!elem.attribs.title) report(node);
        });
      },

      /** @param {ImageReference} node */
      imageReference(node) {
        refDefHandler.push(node);
      },

      /** @param {Definition} node */
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
