/**
 * @fileoverview Rule to disallow git conflict markers.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { IgnoredPositions } from '../../core/ast/index.js';
import { URL_RULE_DOCS, ZERO_TO_ONE_BASED_OFFSET } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { RuleModule } from '../../core/types.js';
 * @typedef {[{ skipCode: boolean }]} RuleOptions
 * @typedef {'noGitConflictMarker'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const gitConflictMarkerRegex = /^(?:<{7}(?!<)|={7}(?!=)|>{7}(?!>))/gmu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow git conflict markers',
      url: URL_RULE_DOCS('no-git-conflict-marker'),

      recommended: true,
      strict: true,
      style: false,
      typography: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          skipCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: true,
      },
    ],

    messages: {
      noGitConflictMarker:
        'Git conflict marker `{{ gitConflictMarker }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ skipCode }] = context.options;

    const ignoredPositions = new IgnoredPositions();

    return {
      code(node) {
        if (skipCode) ignoredPositions.push(sourceCode.getLoc(node)); // Store position information of `Code`.
      },

      'root:exit'() {
        sourceCode.lines.forEach((line, lineIndex) => {
          const matches = line.matchAll(gitConflictMarkerRegex);

          for (const match of matches) {
            const gitConflictMarker = match[0];

            const matchIndexStart = match.index;
            const matchIndexEnd = matchIndexStart + gitConflictMarker.length;

            /** @type {Position} */
            const loc = {
              start: {
                line: lineIndex + ZERO_TO_ONE_BASED_OFFSET,
                column: matchIndexStart + ZERO_TO_ONE_BASED_OFFSET,
              },
              end: {
                line: lineIndex + ZERO_TO_ONE_BASED_OFFSET,
                column: matchIndexEnd + ZERO_TO_ONE_BASED_OFFSET,
              },
            };

            if (ignoredPositions.isIgnoredPosition(loc)) return;

            context.report({
              loc,

              data: {
                gitConflictMarker,
              },

              messageId: 'noGitConflictMarker',
            });
          }
        });
      },
    };
  },
};
