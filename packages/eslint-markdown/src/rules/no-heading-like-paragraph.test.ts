/**
 * @fileoverview Test for `no-heading-like-paragraph.ts`.
 * @author Gaic4o
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-heading-like-paragraph.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-heading-like-paragraph', rule, {
  valid: [
    // Basic
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'Paragraph without hashes',
      code: 'Installation',
    },
    {
      name: 'Heading with the maximum depth',
      code: '###### Installation',
    },
    {
      name: 'Headings with every valid depth',
      code: '# One\n\n## Two\n\n### Three\n\n#### Four\n\n##### Five\n\n###### Six',
    },
    {
      name: 'Setext heading starting with seven hashes',
      code: '####### Installation\n===',
    },

    // Not an opening sequence
    {
      name: 'Seven hashes not followed by whitespace',
      code: '#######Installation',
    },
    {
      name: 'Seven hashes in the middle of a paragraph',
      code: 'Installation ####### Configuration',
    },
    {
      name: 'Six hashes followed by seven hashes',
      code: '###### ####### Installation',
    },
    {
      name: 'Seven hashes followed by a no-break space',
      // A no-break space does not delimit the opening sequence of an ATX heading.
      code: '#######\u00A0Installation',
    },
    {
      name: 'Seven hashes followed by inline markup without whitespace',
      code: '#######*Installation*',
    },

    // Escapes and character references
    {
      name: 'Escaped leading hash',
      code: '\\####### Installation',
    },
    {
      name: 'Character reference as the leading hash',
      code: '&#35;###### Installation',
    },

    // Code
    {
      name: 'Seven hashes in fenced code',
      code: '```md\n####### Installation\n```',
    },
    {
      name: 'Seven hashes in indented code',
      code: '    ####### Installation',
    },
    {
      name: 'Seven hashes in inline code',
      code: '`####### Installation`',
    },

    // Html
    {
      name: 'Seven hashes in an html block',
      code: '<div>\n####### Installation\n</div>',
    },

    // Continuation line
    {
      name: 'Seven hashes on a paragraph continuation line',
      code: 'Installation\n####### Configuration',
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Seven hashes',
      code: '####### Installation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            hashes: '#######',
          },
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### Installation',
              data: {
                hashes: '#######',
                maxDepthHashes: '######',
              },
            },
            {
              messageId: 'suggestEscape',
              output: '\\####### Installation',
            },
          ],
        },
      ],
    },
    {
      name: 'Eight hashes',
      code: '######## Configuration',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 9,
          data: {
            hashes: '########',
          },
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### Configuration',
              data: {
                hashes: '########',
                maxDepthHashes: '######',
              },
            },
            {
              messageId: 'suggestEscape',
              output: '\\######## Configuration',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes followed by a tab',
      code: '#######\tInstallation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '######\tInstallation',
            },
            {
              messageId: 'suggestEscape',
              output: '\\#######\tInstallation',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes without content',
      code: '#######',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '######',
            },
            {
              messageId: 'suggestEscape',
              output: '\\#######',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes followed by trailing whitespace only',
      code: '####### ',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### ',
            },
            {
              messageId: 'suggestEscape',
              output: '\\####### ',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes followed by a line feed',
      code: '#######\nInstallation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '######\nInstallation',
            },
            {
              messageId: 'suggestEscape',
              output: '\\#######\nInstallation',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes followed by a carriage return and a line feed',
      code: '#######\r\nInstallation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '######\r\nInstallation',
            },
            {
              messageId: 'suggestEscape',
              output: '\\#######\r\nInstallation',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes with a closing sequence',
      code: '####### Installation #######',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### Installation #######',
            },
            {
              messageId: 'suggestEscape',
              output: '\\####### Installation #######',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes followed by inline markup',
      code: '####### **Installation**',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### **Installation**',
            },
            {
              messageId: 'suggestEscape',
              output: '\\####### **Installation**',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes with a continuation line',
      code: '####### Installation\nRun the following command.',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### Installation\nRun the following command.',
            },
            {
              messageId: 'suggestEscape',
              output: '\\####### Installation\nRun the following command.',
            },
          ],
        },
      ],
    },
    {
      name: 'Multiple heading-like paragraphs',
      code: '####### Installation\n\n######## Configuration',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '###### Installation\n\n######## Configuration',
            },
            {
              messageId: 'suggestEscape',
              output: '\\####### Installation\n\n######## Configuration',
            },
          ],
        },
        {
          messageId: 'noHeadingLikeParagraph',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 9,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '####### Installation\n\n###### Configuration',
            },
            {
              messageId: 'suggestEscape',
              output: '####### Installation\n\n\\######## Configuration',
            },
          ],
        },
      ],
    },

    // Indent
    {
      name: 'Seven hashes indented by three spaces',
      code: '   ####### Installation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '   ###### Installation',
            },
            {
              messageId: 'suggestEscape',
              output: '   \\####### Installation',
            },
          ],
        },
      ],
    },

    // Blockquote
    {
      name: 'Seven hashes in a blockquote',
      code: '> ####### Installation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 10,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '> ###### Installation',
            },
            {
              messageId: 'suggestEscape',
              output: '> \\####### Installation',
            },
          ],
        },
      ],
    },

    {
      name: 'Seven hashes in a nested blockquote',
      code: '> > ####### Installation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 12,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '> > ###### Installation',
            },
            {
              messageId: 'suggestEscape',
              output: '> > \\####### Installation',
            },
          ],
        },
      ],
    },

    // ListItem
    {
      name: 'Seven hashes in a list item',
      code: '- ####### Installation',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 10,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '- ###### Installation',
            },
            {
              messageId: 'suggestEscape',
              output: '- \\####### Installation',
            },
          ],
        },
      ],
    },
    {
      name: 'Seven hashes in a second paragraph of a list item',
      code: '- Installation\n\n  ####### Configuration',
      errors: [
        {
          messageId: 'noHeadingLikeParagraph',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 10,
          suggestions: [
            {
              messageId: 'suggestUseMaxDepth',
              output: '- Installation\n\n  ###### Configuration',
            },
            {
              messageId: 'suggestEscape',
              output: '- Installation\n\n  \\####### Configuration',
            },
          ],
        },
      ],
    },
  ],
});
