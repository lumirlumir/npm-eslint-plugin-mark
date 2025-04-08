/**
 * @fileoverview Rule to disallow git conflict markers.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { IgnoredPositions } from '../../core/ast/index.js';
import { getRuleDocsUrl } from '../../core/helpers/index.js';
import { ZERO_TO_ONE_BASED_OFFSET } from '../../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/markdown").RuleModule} RuleModule
 * @typedef {import("mdast").Code} Code
 * @typedef {import("unist").Position} Position
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const gitConflictMarkerRegex = /^(?:<{7}(?!<)|={7}(?!=)|>{7}(?!>))/gmu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule} */
export default {
  meta: {
    type: 'problem',

    docs: {
      recommended: true,
      description: 'Disallow git conflict markers',
      url: getRuleDocsUrl('no-git-conflict-marker'),
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
    // @ts-expect-error -- TODO
    const [{ skipCode }] = context.options;
    const { lines } = context.sourceCode;

    const ignoredPositions = new IgnoredPositions();

    return {
      /** @param {Code} node */
      code(node) {
        if (skipCode) ignoredPositions.push(node.position); // Store position information of `Code`.
      },

      'root:exit': function () {
        lines.forEach((line, lineIndex) => {
          const matches = [...line.matchAll(gitConflictMarkerRegex)];

          if (matches.length > 0) {
            matches.forEach(match => {
              const gitConflictMarkerLength = match[0].length;

              const matchIndexStart = match.index;
              const matchIndexEnd = matchIndexStart + gitConflictMarkerLength;

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
                  gitConflictMarker: match[0],
                },

                messageId: 'noGitConflictMarker',
              });
            });
          }
        });
      },
    };
  },
};
