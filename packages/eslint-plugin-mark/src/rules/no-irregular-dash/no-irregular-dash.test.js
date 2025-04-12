/**
 * @fileoverview Test for `no-irregular-dash.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../../core/tests/index.js';
import rule from './no-irregular-dash.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const noIrregularDash = 'noIrregularDash';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'irregular dash in code - 1',
      code: `
\`\`\`js
\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2212\u23af\u2e3a\u2e3b\u30fc\ufe58\ufe63\uff0d
\`\`\``,
    },
    {
      name: 'irregular dash in code - 2',
      code: `
\`\`\`js\u2013
console.log(\u2014'Hello World');
\`\`\``,
    },
    {
      name: 'irregular dash in inline code',
      code: `\`console.log(\u2013'Hello World')\`

\`console.log(\u2014'Hello World')\``,
    },
  ],

  invalid: [
    // Basic
    {
      name: 'irregular dash',
      code: `
1\u20102\u20113\u20124\u20135\u20146\u20157\u20438\u22129\u23af0\u2e3a
1\u2e3b2\u30fc3\ufe584\ufe635\uff0d`,
      errors: [
        {
          messageId: noIrregularDash,
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 8,
          endLine: 2,
          endColumn: 9,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 12,
          endLine: 2,
          endColumn: 13,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 15,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 17,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 19,
        },
        {
          messageId: noIrregularDash,
          line: 2,
          column: 20,
          endLine: 2,
          endColumn: 21,
        },
        {
          messageId: noIrregularDash,
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 3,
        },
        {
          messageId: noIrregularDash,
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
        },
        {
          messageId: noIrregularDash,
          line: 3,
          column: 6,
          endLine: 3,
          endColumn: 7,
        },
        {
          messageId: noIrregularDash,
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 9,
        },
        {
          messageId: noIrregularDash,
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
        },
      ],
    },

    // Options
    {
      name: '`skipCode: false`',
      code: `
\`\`\`js
console.log(\u2013'Hello World');
\`\`\``,
      errors: [
        {
          messageId: noIrregularDash,
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 14,
        },
      ],
      options: [
        {
          skipCode: false,
        },
      ],
    },
    {
      name: '`skipInlineCode: false`',
      code: "`console.log(\u2014'Hello World')`",
      errors: [
        {
          messageId: noIrregularDash,
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
        },
      ],
      options: [
        {
          skipInlineCode: false,
        },
      ],
    },
  ],
});
