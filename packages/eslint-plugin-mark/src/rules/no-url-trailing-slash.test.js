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
    '[](https://example.com)',
    '[](https://example.com/path/to/resource)',
    '[](https://example.com#fragment)',
    '[](https://example.com#fragment/)',
    '[](https://example.com?query=string)',
    '[](https://example.com?query=string/)',
    '[](https://example.com/path/to/resource?query=string#fragment)',
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
