/**
 * @fileoverview Rule to enforce the use of allowed text for headings.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getRuleDocsUrl } from '../../core/helpers/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Heading} Heading
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const headingRegex = /^#{1,6}\s+/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: false,
      description: 'Enforce the use of allowed text for headings',
      url: getRuleDocsUrl('allowed-heading'),
    },

    schema: [
      {
        type: 'object',
        properties: {
          h1: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
              },
            ],
          },
          h2: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
              },
            ],
          },
          h3: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
              },
            ],
          },
          h4: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
              },
            ],
          },
          h5: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
              },
            ],
          },
          h6: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
      },
    ],

    messages: {
      allowedHeading:
        'The heading text `{{ heading }}` is not allowed. Please use one of the following allowed text: {{ allowed }}.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    // @ts-expect-error -- TODO
    const [{ h1, h2, h3, h4, h5, h6 }] = context.options;
    const headingMap = {
      1: h1,
      2: h2,
      3: h3,
      4: h4,
      5: h5,
      6: h6,
    };

    return {
      /** @param {Heading} node */
      heading(node) {
        const actualHeadingText = context.sourceCode
          // @ts-expect-error -- TODO
          .getText(node)
          .replace(headingRegex, '');
        const expectedHeadingTexts = headingMap[node.depth];

        if (expectedHeadingTexts === false) return;

        if (!expectedHeadingTexts.includes(actualHeadingText)) {
          context.report({
            // @ts-expect-error -- TODO
            node,

            messageId: 'allowedHeading',

            data: {
              heading: actualHeadingText,
              allowed: expectedHeadingTexts.map(text => `\`${text}\``).join(', '),
            },
          });
        }
      },
    };
  },
};
