/**
 * @fileoverview Test for `no-url-trailing-slash.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './no-url-trailing-slash.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: [
    '',
    '  ',
    // Link
    '[](invalid-url)',
    '[](https://example.com)',
    '[](https://example.com/path/to/resource)',
    '[](https://example.com#)',
    '[](https://example.com##)',
    '[](https://example.com#fragment)',
    '[](https://example.com#fragment/)',
    '[](https://example.com?)',
    '[](https://example.com??)',
    '[](https://example.com?query=string)',
    '[](https://example.com?query=string/)',
    '[](https://example.com#?)',
    '[](https://example.com?#)',
    '[](https://example.com?query=string#)',
    '[](https://example.com/path/to/resource?query=string#)',
    '[](https://example.com/path/to/resource?query=string#fragment)',
    '<https://example.com>',
    {
      code: 'https://example.com',
      language: 'markdown/gfm',
    },
    // Image
    '![](https://example.com)',
    // Definition
    '[foo]: https://example.com',
    // HTML - `a` tag
    '<a href="https://example.com">text</a>',
    // HTML - `img` tag
    '<img src="https://example.com">',
  ],

  invalid: [
    // Link
    {
      code: '[](https://example.com/)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 25,
        },
      ],
    },
    {
      code: '[](https://example.com/path/to/resource/)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      code: '[](https://example.com/#)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 26,
        },
      ],
    },
    {
      code: '[](https://example.com/##)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      code: '[](https://example.com/#fragment)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 34,
        },
      ],
    },
    {
      code: '[](https://example.com/#fragment/)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 35,
        },
      ],
    },
    {
      code: '[](https://example.com/?)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 26,
        },
      ],
    },
    {
      code: '[](https://example.com/??)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      code: '[](https://example.com/?query=string)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },
    {
      code: '[](https://example.com/?query=string/)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 39,
        },
      ],
    },
    {
      code: '[](https://example.com/#?)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      code: '[](https://example.com/?#)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      code: '[](https://example.com/?query=string#)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 39,
        },
      ],
    },
    {
      code: '[](https://example.com/path/to/resource/?query=string#)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 56,
        },
      ],
    },
    {
      code: '[](https://example.com/path/to/resource/?query=string#fragment)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 64,
        },
      ],
    },
    {
      code: '<https://example.com/>',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 23,
        },
      ],
    },
    {
      code: 'https://example.com/',
      language: 'markdown/gfm',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 21,
        },
      ],
    },

    // Image
    {
      code: '![](https://example.com/)',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 26,
        },
      ],
    },

    // Definition
    {
      code: '[foo]: https://example.com/',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },

    // HTML - `a` tag
    {
      code: '<a href="https://example.com/">text</a>',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 31,
        },
      ],
    },

    // HTML - `img` tag
    {
      code: '<img src="https://example.com/">',
      errors: [
        {
          messageId: 'noUrlTrailingSlash',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 32,
        },
      ],
    },
  ],
});
