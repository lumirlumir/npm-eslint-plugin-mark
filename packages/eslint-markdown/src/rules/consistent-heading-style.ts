/**
 * @fileoverview Rule to enforce consistent heading style.
 * @author Ga eun Lee(tooth-is-silver)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md003.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { isBlankLine } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------------

const SETEXT_MAX_DEPTH = 2;
const HEADING_STYLE = [
  'consistent',
  'atx',
  'atx-closed',
  'setext',
  'setext-with-atx',
  'setext-with-atx-closed',
] as const;

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------
type HeadingStyle = (typeof HEADING_STYLE)[number];
type RuleOptions = [{ style: HeadingStyle }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Matches the closing sequence of a closed ATX heading.
 * see: https://spec.commonmark.org/0.31.2/#atx-headings
 */
const closingSequenceRegex = /[ \t]#+[ \t]*$/;

/**
 * Matches heading content that may start a block-level construct after conversion to Setext.
 * see: https://spec.commonmark.org/0.31.2/#blocks-and-inlines
 */
const potentialBlockStartRegex = /^(?:>|(?:[-+*]|\d{1,9}[.)])(?:[ \t]|$))/u;

function getExpectedHeadingStyle(
  style: Exclude<HeadingStyle, 'consistent'>,
  depth: number,
): 'atx' | 'atx-closed' | 'setext' {
  if (style === 'setext-with-atx') {
    return depth <= SETEXT_MAX_DEPTH ? 'setext' : 'atx';
  }

  if (style === 'setext-with-atx-closed') {
    return depth <= SETEXT_MAX_DEPTH ? 'setext' : 'atx-closed';
  }

  return style;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent heading style',
      url: URL_RULE_DOCS('consistent-heading-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: HEADING_STYLE,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'consistent',
      },
    ],

    messages: {
      style: 'Heading style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    let documentHeadingStyle = style === 'consistent' ? null : style;

    return {
      heading(node) {
        const nodeText = sourceCode.getText(node);
        const nodeLocation = sourceCode.getLoc(node);

        const currentHeadingStyle =
          nodeLocation.start.line !== nodeLocation.end.line
            ? 'setext'
            : closingSequenceRegex.test(nodeText)
              ? 'atx-closed'
              : 'atx';

        if (documentHeadingStyle === null) {
          documentHeadingStyle = currentHeadingStyle;
        }

        const expectedHeadingStyle = getExpectedHeadingStyle(
          documentHeadingStyle,
          node.depth,
        );

        if (currentHeadingStyle === expectedHeadingStyle) {
          return;
        }

        const nodeRange = sourceCode.getRange(node);
        const [nodeStartOffset, nodeEndOffset] = nodeRange;

        let replacementRange = nodeRange;
        let replacementText: string | null = null;

        if (currentHeadingStyle === 'atx' && expectedHeadingStyle === 'atx-closed') {
          replacementRange = [nodeEndOffset, nodeEndOffset];

          replacementText = ` ${'#'.repeat(node.depth)}`;
        } else if (
          currentHeadingStyle === 'atx-closed' &&
          expectedHeadingStyle === 'atx'
        ) {
          const lastChild = node.children.at(-1);

          // An empty closed heading has no child, so remove everything after its opening sequence.
          const closingStartOffset = lastChild
            ? sourceCode.getRange(lastChild)[1]
            : nodeStartOffset + node.depth;

          replacementRange = [closingStartOffset, nodeEndOffset];

          replacementText = '';
        } else {
          const firstChildNode = node.children[0];
          const lastChildNode = node.children.at(-1);

          if (firstChildNode && lastChildNode) {
            const [contentStartOffset] = sourceCode.getRange(firstChildNode);
            const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

            const headingContent = sourceCode.text.slice(
              contentStartOffset,
              contentEndOffset,
            );

            if (currentHeadingStyle === 'setext') {
              const firstChildLocation = sourceCode.getLoc(firstChildNode);
              const lastChildLocation = sourceCode.getLoc(lastChildNode);

              const isMultilineHeading =
                firstChildLocation.start.line !== lastChildLocation.end.line;

              if (!isMultilineHeading) {
                const headingMarker = '#'.repeat(node.depth);

                if (expectedHeadingStyle === 'atx-closed') {
                  replacementText = `${headingMarker} ${headingContent} ${headingMarker}`;
                } else {
                  // Prevent trailing hashes from becoming an ATX closing sequence.
                  const escapedHeadingContent = headingContent.replace(
                    /(?<=[ \t])(?=#+[ \t]*$)/u,
                    '\\',
                  );
                  replacementText = `${headingMarker} ${escapedHeadingContent}`;
                }
              }
            } else {
              const nodeStartLine = nodeLocation.start.line;

              const isPotentialBlockStart = potentialBlockStartRegex.test(headingContent);
              // Locations are one-based, while `lines` is zero-based; `-2` selects the preceding line.
              // Treat a missing preceding line at the start of the document as blank.
              const isPreviousLineBlank = isBlankLine(
                sourceCode.lines[nodeStartLine - 2] ?? '',
              );

              const canConvertToSetext =
                !isPotentialBlockStart &&
                node.depth <= SETEXT_MAX_DEPTH &&
                sourceCode.getParent(node)?.type === 'root' &&
                isPreviousLineBlank;

              if (canConvertToSetext) {
                const lineEnding = sourceCode.text.match(/\r\n|\r|\n/)?.[0] ?? '\n';

                const underlineMarker = node.depth === 1 ? '=' : '-';

                replacementText = `${headingContent}${lineEnding}${underlineMarker.repeat(
                  headingContent.length,
                )}`;
              }
            }
          }
        }

        // Report every mismatch even when no semantics-preserving fix is available.
        context.report({
          node,
          messageId: 'style',
          data: {
            style: expectedHeadingStyle,
          },
          fix(fixer) {
            if (replacementText === null) {
              return null;
            }

            return fixer.replaceTextRange(replacementRange, replacementText);
          },
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
