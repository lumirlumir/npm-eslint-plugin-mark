/**
 * @fileoverview Rule to disallow consecutive blank lines.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ max: number, skipCode: boolean }]} RuleOptions
 * @typedef {'noConsecutiveBlankLine'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow consecutive blank lines',
      url: URL_RULE_DOCS('no-consecutive-blank-line'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0,
          },
          skipCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        max: 1,
        skipCode: true,
      },
    ],

    messages: {
      noConsecutiveBlankLine: 'Consecutive blank lines are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(/* context */) {
    // const { sourceCode } = context;
    // const [{ max, skipCode }] = context.options;

    return {
      'root:exit'(/* node */) {},
    };
  },
};
