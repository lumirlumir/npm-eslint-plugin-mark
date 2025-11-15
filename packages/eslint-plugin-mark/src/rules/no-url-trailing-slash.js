/**
 * @fileoverview TODO
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getElementsByTagName } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[]} RuleOptions
 * @typedef {'noUrlTrailingSlash'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow URL trailing slash',
      url: URL_RULE_DOCS('no-url-trailing-slash'),
      recommended: false,
      stylistic: false,
    },

    messages: {
      noUrlTrailingSlash: 'URL trailing slash is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      image(node) {
        const url = new URL(node.url);

        url.search = '';
        url.hash = '';

        if (url.href.endsWith('/')) {
          context.report({
            node,
            messageId: 'noUrlTrailingSlash',
          });
        }
      },

      link(node) {
        const url = new URL(node.url);

        url.search = '';
        url.hash = '';

        if (url.href.endsWith('/')) {
          context.report({
            node,
            messageId: 'noUrlTrailingSlash',
          });
        }
      },

      html(node) {
        const html = sourceCode.getText(node);

        getElementsByTagName(html, 'a').forEach(({ attrs /* sourceCodeLocation */ }) => {
          for (const { name, value } of attrs) {
            if (name === 'href') {
              const url = new URL(value);

              url.search = '';
              url.hash = '';

              if (url.href.endsWith('/')) {
                context.report({
                  node,
                  messageId: 'noUrlTrailingSlash',
                });
              }
            }
          }
        });

        getElementsByTagName(html, 'img').forEach(
          ({ attrs /* sourceCodeLocation */ }) => {
            for (const { name, value } of attrs) {
              if (name === 'src') {
                const url = new URL(value);

                url.search = '';
                url.hash = '';

                if (url.href.endsWith('/')) {
                  context.report({
                    node,
                    messageId: 'noUrlTrailingSlash',
                  });
                }
              }
            }
          },
        );
      },

      definition(node) {
        const url = new URL(node.url);

        url.search = '';
        url.hash = '';

        if (url.href.endsWith('/')) {
          context.report({
            node,
            messageId: 'noUrlTrailingSlash',
          });
        }
      },
    };
  },
};
