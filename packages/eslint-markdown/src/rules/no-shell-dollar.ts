/**
 * @fileoverview Rule to disallow dollar signs before commands without showing output.
 * @author lumir(lumirlumir)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md014.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ skipCode: string[] }];
type MessageIds = 'noShellDollar';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

// `\s` in regular expressions matches whitespace characters beyond ` ` and `\t`,
// so we explicitly use `[ \t]` to match those characters to avoid unexpected matches.
const dollarCommandRegex = /^(?<indentation>[ \t]*)(?<prompt>\$[ \t]+)/;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow dollar signs before commands without showing output',
      url: URL_RULE_DOCS('no-shell-dollar'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          skipCode: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: [],
      },
    ],

    messages: {
      noShellDollar:
        'Dollar sign should not be used before commands without showing output.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ skipCode }] = context.options;

    return {
      code(node) {
        // If the lang is in the skip list, skip it.
        if (node.lang && skipCode.includes(node.lang)) {
          return;
        }

        const codeLines = node.value.split('\n').filter(line => line.trim() !== ''); // Blank lines are neither commands nor output.

        const commandLines: string[] = [];
        let isContinued = false;

        for (const codeLine of codeLines) {
          // A line continued with a backslash carries the rest of the command, not output,
          // so it has no prompt of its own to report.
          if (!isContinued) {
            // A line without a prompt is output, and a code block showing output keeps its prompts.
            if (!dollarCommandRegex.test(codeLine)) {
              return;
            }

            commandLines.push(codeLine);
          }

          isContinued = codeLine.trimEnd().endsWith('\\');
        }

        if (commandLines.length === 0) {
          return;
        }

        const [nodeStartOffset] = sourceCode.getRange(node);
        const nodeText = sourceCode.getText(node);

        // Skip the opening fence line, as its `lang` and `meta` can contain the same text as a code line.
        let searchOffset = /^[`~]/.test(nodeText) ? nodeText.indexOf('\n') + 1 : 0;

        for (const commandLine of commandLines) {
          // Each code line appears verbatim in the source, even inside a blockquote or a list.
          const codeLineOffset = nodeText.indexOf(commandLine, searchOffset);

          searchOffset = codeLineOffset + commandLine.length;

          const { indentation, prompt } = dollarCommandRegex.exec(commandLine)!.groups!;

          const startOffset = nodeStartOffset + codeLineOffset + indentation.length;
          const endOffset = startOffset + prompt.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noShellDollar',

            fix(fixer) {
              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
