/**
 * @fileoverview Test for `require-link-title.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './require-link-title.js';

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
      name: 'Link node with title attribute - 1',
      code: '[](https://example.com "title")',
    },
    {
      name: 'Link node with title attribute - 2',
      code: "[](https://example.com 'title')",
    },
    {
      name: 'Link node with title attribute - 3',
      code: '[](https://example.com (title))',
    },
    {
      name: 'Link node with autolink - 1',
      code: '<https://example.com>',
    },
    {
      name: 'Link node with autolink - 2',
      code: 'https://example.com',
      language: 'markdown/gfm', // TODO: ESLint does not support `language` key in the Test runner.
    },
    {
      name: 'LinkReference node with title attribute - 1',
      code: `
[text][link]

[link]: https://example.com "title"
`,
    },
    {
      name: 'LinkReference node with title attribute - 2',
      code: `
[text][link]

[link]: https://example.com 'title'
`,
    },
    {
      name: 'LinkReference node with title attribute - 3',
      code: `
[text][link]

[link]: https://example.com (title)
`,
    },
    {
      name: "LinkReference node with `'//'`",
      code: `
[text][//]

[//]: https://example.com
`,
    },
    {
      name: 'Html node with title attribute',
      code: '<a href="https://example.com" title="title">text</a>',
    },
    {
      name: 'Nested Html node with title attribute',
      code: `
<div>
  <a href="https://example.com" title="title">text</a>
</div>
`,
    },

    // Options
    {
      name: "LinkReference node with `'hi'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['hi'] }],
      code: `
[text][hi]

[hi]: https://example.com
`,
    },
    {
      name: "LinkReference node with `'HI'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['HI'] }],
      code: `
[text][hi]

[hi]: https://example.com
`,
    },
    {
      name: "LinkReference node with `'GRÜẞE'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['GRÜẞE'] }],
      code: `
[text][Grüsse]

[Grüsse]: https://example.com
`,
    },
  ],

  invalid: [
    {
      name: 'Link node without title attribute',
      code: '[](https://example.com)',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 24,
        },
      ],
    },
    {
      name: 'Link node with empty title attribute - 1',
      code: '[](https://example.com "")',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      name: 'Link node with empty title attribute - 2',
      code: "[](https://example.com '')",
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      name: 'Link node with empty title attribute - 3',
      code: '[](https://example.com ())',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },

    {
      name: 'LinkReference node without title attribute',
      code: `
[text][link]

[link]: https://example.com`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 28,
        },
      ],
    },
    /*
    {
      name: 'ImageReference node with empty title attribute - 1',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ""`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 2',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ''`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 3',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ()`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },

    {
      name: 'Html node without title attribute - 1',
      code: '<img src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 2',
      code: '<img\nsrc="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 37,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 3',
      code: '<img\n src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 4',
      code: '<img\n  src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 39,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute',
      code: '<img src="https://example.com/image.jpg" title="">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 51,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 1',
      code: `
<div>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 44,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 2',
      code: `
<div>
  <img src="https://example.com/image.jpg">
  <br>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 44,
        },
        {
          messageId: 'requireImageTitle',
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 44,
        },
      ],
    },
    */
  ],
});
