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
 * @import { Image, ImageReference, Definition, Html } from 'mdast'
 * @typedef {import("../../core/types.d.ts").RuleModule<{ RuleOptions: RuleOptions, MessageIds: MessageIds }>} RuleModule
 * @typedef {[]} RuleOptions
 * @typedef {'imageTitle'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of title attribute for images',
      url: URL_RULE_DOCS('image-title'),

      recommended: false,
      strict: false,
      style: false,
      typography: false,
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
        node,
        messageId: 'imageTitle',
      });
    }

    return {
      image(node) {
        if (!node.title) report(node);
      },

      html(node) {
        const $ = cheerio.load(node.value);

        $('img').each((_, elem) => {
          if (!elem.attribs.title) report(node);
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
