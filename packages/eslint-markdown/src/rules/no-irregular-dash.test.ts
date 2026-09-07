/**
 * @fileoverview Test for `no-irregular-dash.ts`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-irregular-dash.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-irregular-dash', rule, {
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

    // Options
    {
      name: '`allow`',
      code: `1\u20132\u2014`,
      options: [
        {
          allow: ['\u2013', '\u2014'],
        },
      ],
    },
    {
      name: "`skipCode: ['md']`",
      code: `\`\`\`md
\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2212\u23af\u2e3a\u2e3b\u30fc\ufe58\ufe63\uff0d
\`\`\``,
      options: [
        {
          skipCode: ['md'],
        },
      ],
    },
    {
      name: "`skipCode: ['txt']`",
      code: `\`\`\`txt
\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2212\u23af\u2e3a\u2e3b\u30fc\ufe58\ufe63\uff0d
\`\`\``,
      options: [
        {
          skipCode: ['txt'],
        },
      ],
    },

    // skipMath and skipInlineMath Options
    {
      name: '`skipMath: true` default: math block should be skipped',
      code: `$$
x \u2212 y = 0
$$`,
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipInlineMath: true` default: inline math should be skipped',
      code: `$x \u2212 y$`,
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: true` explicit option: math block should be skipped',
      code: `$$
x \u2212 y = 0
$$`,
      options: [
        {
          skipMath: true,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipInlineMath: true` explicit option: inline math should be skipped',
      code: `$x \u2212 y$`,
      options: [
        {
          skipInlineMath: true,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: true, skipInlineMath: false` options: math block should be skipped',
      code: `$$
x \u2212 y = 0
$$`,
      options: [
        {
          skipMath: true,
          skipInlineMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: false, skipInlineMath: true` options: inline math should be skipped',
      code: `$x \u2212 y$`,
      options: [
        {
          skipMath: false,
          skipInlineMath: true,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: 'Irregular dash outside math block allowed by `allow` option',
      code: `$$
x \u2212 y
$$
a \u2013 b`,
      options: [
        {
          allow: ['\u2013'],
        },
      ],
      languageOptions: {
        math: true,
      },
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
          messageId: 'noIrregularDash',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
          data: {
            irregularDash: 'U+2010',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
          data: {
            irregularDash: 'U+2011',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
          data: {
            irregularDash: 'U+2012',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 8,
          endLine: 2,
          endColumn: 9,
          data: {
            irregularDash: 'U+2013',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: {
            irregularDash: 'U+2014',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 12,
          endLine: 2,
          endColumn: 13,
          data: {
            irregularDash: 'U+2015',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 15,
          data: {
            irregularDash: 'U+2043',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 17,
          data: {
            irregularDash: 'U+2212',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 19,
          data: {
            irregularDash: 'U+23AF',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 20,
          endLine: 2,
          endColumn: 21,
          data: {
            irregularDash: 'U+2E3A',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 3,
          data: {
            irregularDash: 'U+2E3B',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: {
            irregularDash: 'U+30FC',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 3,
          column: 6,
          endLine: 3,
          endColumn: 7,
          data: {
            irregularDash: 'U+FE58',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 9,
          data: {
            irregularDash: 'U+FE63',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: {
            irregularDash: 'U+FF0D',
          },
        },
      ],
    },
    {
      name: 'Irregular dash in inline code',
      code: '`\u2010`\u2010',
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: {
            irregularDash: 'U+2010',
          },
        },
      ],
    },

    // Options
    {
      name: '`allow`',
      code: `1\u20132\u20143\u2015`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: {
            irregularDash: 'U+2015',
          },
        },
      ],
      options: [
        {
          allow: ['\u2013', '\u2014'],
        },
      ],
    },
    {
      name: '`skipCode: false`',
      code: `
\`\`\`js
console.log(\u2013'Hello World');
\`\`\``,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 14,
          data: {
            irregularDash: 'U+2013',
          },
        },
      ],
      options: [
        {
          skipCode: false,
        },
      ],
    },
    {
      name: "`skipCode: ['js', 'ts']`",
      code: `\`\`\`md
Foo\u2010Bar
\`\`\`

    code block with\u2011NBHY`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
          data: {
            irregularDash: 'U+2010',
          },
        },
        {
          messageId: 'noIrregularDash',
          line: 5,
          column: 20,
          endLine: 5,
          endColumn: 21,
          data: {
            irregularDash: 'U+2011',
          },
        },
      ],
      options: [
        {
          skipCode: ['js', 'ts'],
        },
      ],
    },
    {
      name: '`skipInlineCode: false`',
      code: "`console.log(\u2014'Hello World')`",
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
          data: {
            irregularDash: 'U+2014',
          },
        },
      ],
      options: [
        {
          skipInlineCode: false,
        },
      ],
    },

    // skipMath and skipInlineMath Options
    {
      name: '`skipMath: false` option: math block should not be skipped',
      code: `$$
x \u2212 y
$$`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: {
            irregularDash: 'U+2212',
          },
        },
      ],
      options: [
        {
          skipMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipInlineMath: false` option: inline math should not be skipped',
      code: `$x \u2212 y$`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: {
            irregularDash: 'U+2212',
          },
        },
      ],
      options: [
        {
          skipInlineMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: false, skipInlineMath: true` options: math block is reported',
      code: `$$
x \u2212 y
$$
$a \u2212 b$`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: {
            irregularDash: 'U+2212',
          },
        },
      ],
      options: [
        {
          skipMath: false,
          skipInlineMath: true,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: '`skipMath: true, skipInlineMath: false` options: inline math is reported',
      code: `$$
x \u2212 y
$$
$a \u2212 b$`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 4,
          column: 4,
          endLine: 4,
          endColumn: 5,
          data: {
            irregularDash: 'U+2212',
          },
        },
      ],
      options: [
        {
          skipMath: true,
          skipInlineMath: false,
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: 'Irregular dash outside math region is reported when not permitted by `allow`',
      code: `$$
x \u2212 y
$$
outside \u2013 dash`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 4,
          column: 9,
          endLine: 4,
          endColumn: 10,
          data: {
            irregularDash: 'U+2013',
          },
        },
      ],
      languageOptions: {
        math: true,
      },
    },
    {
      name: 'Math parsing disabled: `skipMath: true` does not exclude text in math block delimiters',
      code: `$$
x \u2212 y
$$`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: {
            irregularDash: 'U+2212',
          },
        },
      ],
      options: [
        {
          skipMath: true,
        },
      ],
    },
    {
      name: 'Math parsing disabled: `skipInlineMath: true` does not exclude text in inline math delimiters',
      code: `$x \u2212 y$`,
      errors: [
        {
          messageId: 'noIrregularDash',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: {
            irregularDash: 'U+2212',
          },
        },
      ],
      options: [
        {
          skipInlineMath: true,
        },
      ],
    },
  ],
});
