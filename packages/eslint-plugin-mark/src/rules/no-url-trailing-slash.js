/**
 * @fileoverview Rule to disallow URL trailing slash.
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
 * @import { Image, Link, Definition } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[]} RuleOptions
 * @typedef {'noUrlTrailingSlash'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Check whether the URL has a trailing slash.
 * - It returns `false` if the `URL` constructor cannot parse the given URL.
 * - This function ignores the `hash` and `search` parts.
 * @param {string} url
 * @returns {boolean}
 */
function hasTrailingSlash(url) {
  try {
    const { hash, search } = new URL(url);
    let urlWithoutHashAndSearch = url;

    if (hash) {
      urlWithoutHashAndSearch = urlWithoutHashAndSearch.slice(0, url.indexOf(hash));
    }

    if (search) {
      urlWithoutHashAndSearch = urlWithoutHashAndSearch.slice(0, url.indexOf(search));
    }

    return urlWithoutHashAndSearch.endsWith('/');
  } catch {
    return false;
  }
}

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
      'image, link, definition'(/** @type {Image | Link | Definition} */ node) {
        if (hasTrailingSlash(node.url)) {
          context.report({
            node,
            messageId: 'noUrlTrailingSlash',
          });
        }
      },

      html(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const html = sourceCode.getText(node);

        for (const { attrs, sourceCodeLocation } of getElementsByTagName(html, 'a')) {
          for (const { name, value } of attrs) {
            if (name === 'href' && sourceCodeLocation?.attrs && hasTrailingSlash(value)) {
              context.report({
                loc: {
                  start: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.href.startOffset,
                  ),
                  end: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.href.endOffset,
                  ),
                },
                messageId: 'noUrlTrailingSlash',
              });
            }
          }
        }

        for (const { attrs, sourceCodeLocation } of getElementsByTagName(html, 'img')) {
          for (const { name, value } of attrs) {
            if (name === 'src' && sourceCodeLocation?.attrs && hasTrailingSlash(value)) {
              context.report({
                loc: {
                  start: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.src.startOffset,
                  ),
                  end: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.src.endOffset,
                  ),
                },
                messageId: 'noUrlTrailingSlash',
              });
            }
          }
        }
      },
    };
  },
};
