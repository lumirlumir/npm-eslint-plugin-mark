/**
 * @fileoverview Rule to disallow paragraphs that look like headings.
 * @author Gaic4o
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [];
type MessageIds = 'noHeadingLikeParagraph' | 'suggestUseMaxDepth' | 'suggestEscape';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * The opening sequence of an ATX heading with the maximum depth of `6`.
 * @see https://spec.commonmark.org/0.31.2/#atx-headings
 */
const maxDepthHashes = '######';

/**
 * Matches seven or more `#` characters at the beginning of a paragraph, followed by
 * a space, a tab, a line ending, or the end of the paragraph. This mirrors how CommonMark
 * delimits the opening sequence of an ATX heading, so a no-break space does not count.
 */
const headingLikeParagraphRegex = /^#{7,}(?=[ \t\r\n]|$)/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow paragraphs that look like headings',
      url: URL_RULE_DOCS('no-heading-like-paragraph'),
      recommended: false,
      stylistic: false,
    },

    hasSuggestions: true,

    messages: {
      noHeadingLikeParagraph:
        '`{{ hashes }}` does not open a heading. ATX headings support at most 6 `#` characters.',
      suggestUseMaxDepth: 'Replace `{{ hashes }}` with `{{ maxDepthHashes }}`.',
      suggestEscape: 'Escape the leading `#` to keep it as a paragraph.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      paragraph(node) {
        /*
         * Read the raw source text rather than the `value` of the first `text` child,
         * since `value` already resolves character escapes and character references.
         * `\####### Foo` and `&#35;###### Foo` render as paragraphs starting with seven
         * `#` characters, but the author escaped them on purpose.
         */
        const match = headingLikeParagraphRegex.exec(sourceCode.getText(node));

        if (!match) return;

        const hashes = match[0];

        const [startOffset] = sourceCode.getRange(node);
        const endOffset = startOffset + hashes.length;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(startOffset),
            end: sourceCode.getLocFromIndex(endOffset),
          },

          data: {
            hashes,
          },

          messageId: 'noHeadingLikeParagraph',

          suggest: [
            {
              messageId: 'suggestUseMaxDepth',

              data: {
                hashes,
                maxDepthHashes,
              },

              fix(fixer) {
                return fixer.replaceTextRange([startOffset, endOffset], maxDepthHashes);
              },
            },
            {
              messageId: 'suggestEscape',

              fix(fixer) {
                return fixer.insertTextBeforeRange([startOffset, endOffset], '\\');
              },
            },
          ],
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
