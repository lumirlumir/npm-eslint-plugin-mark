/**
 * @fileoverview Rule to disallow irregular dash.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { SkipRanges } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [
  {
    allow: string[];
    override: Record<string, string>;
    skipCode: boolean | string[];
    skipInlineCode: boolean;
  },
];
type MessageIds = 'noIrregularDash';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const irregularDashMap: Readonly<Record<string, string>> = Object.freeze({
  '\u2010': '-',
  '\u2011': '-',
  '\u2012': '-',
  '\u2013': '-',
  '\u2014': '-',
  '\u2015': '-',
  '\u2043': '-',
  '\u2212': '-',
  '\u23af': '-',
  '\u2e3a': '-',
  '\u2e3b': '-',
  '\u30fc': '-',
  '\ufe58': '-',
  '\ufe63': '-',
  '\uff0d': '-',
});
const irregularDashRegex = new RegExp(
  `[${Object.keys(irregularDashMap).join('')}]`,
  'gu',
);

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow irregular dash',
      url: URL_RULE_DOCS('no-irregular-dash'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
          override: {
            type: 'object',
            additionalProperties: {
              type: 'string',
            },
          },
          skipCode: {
            oneOf: [
              {
                type: 'boolean',
              },
              {
                type: 'array',
                items: {
                  type: 'string',
                },
                uniqueItems: true,
              },
            ],
          },
          skipInlineCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allow: [],
        override: {},
        skipCode: true,
        skipInlineCode: true,
      },
    ],

    messages: {
      noIrregularDash: 'Irregular dash `{{ irregularDash }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allow, override, skipCode, skipInlineCode }] = context.options;

    const skipRanges = new SkipRanges();

    const mergedIrregularDashMap = {
      ...irregularDashMap,
      ...override,
    };

    return {
      code(node) {
        if (
          Array.isArray(skipCode) ? node.lang && skipCode.includes(node.lang) : skipCode
        )
          skipRanges.push(sourceCode.getRange(node)); // Store range information of `Code`.
      },

      inlineCode(node) {
        if (skipInlineCode) skipRanges.push(sourceCode.getRange(node)); // Store range information of `InlineCode`.
      },

      'root:exit'() {
        const matches = sourceCode.text.matchAll(irregularDashRegex);

        for (const match of matches) {
          const irregularDash = match[0];

          if (allow.includes(irregularDash)) continue;

          const startOffset = match.index;
          const endOffset = startOffset + irregularDash.length;

          if (skipRanges.includes(startOffset)) continue;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              irregularDash: `U+${irregularDash.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`,
            },

            messageId: 'noIrregularDash',

            fix(fixer) {
              return fixer.replaceTextRange(
                [startOffset, endOffset],
                mergedIrregularDashMap[irregularDash],
              );
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
