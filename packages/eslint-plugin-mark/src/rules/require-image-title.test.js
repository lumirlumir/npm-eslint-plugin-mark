/**
 * @fileoverview Test for `image-title.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './require-image-title.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const imageTitle = 'imageTitle';

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
      name: 'Image node with title attribute',
      code: '![](https://example.com/image.jpg "title")',
    },
    {
      name: 'ImageReference node with title attribute',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg "title"
`,
    },
    {
      name: 'Html node with title attribute',
      code: '<img src="https://example.com/image.jpg" title="title">',
    },
    {
      name: 'Nested Html node with title attribute',
      code: `
<div>
  <img src="https://example.com/image.jpg" title="title">
</div>
`,
    },
  ],

  invalid: [
    {
      name: 'Image node without title attribute',
      code: '![](https://example.com/image.jpg)',
      errors: [
        {
          messageId: imageTitle,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 35,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute',
      code: '![](https://example.com/image.jpg "")',
      errors: [
        {
          messageId: imageTitle,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },

    {
      name: 'ImageReference node without title attribute',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg`,
      errors: [
        {
          messageId: imageTitle,
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 39,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ""`,
      errors: [
        {
          messageId: imageTitle,
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },

    {
      name: 'Html node without title attribute',
      code: '<img src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: imageTitle,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute',
      code: '<img src="https://example.com/image.jpg" title="">',
      errors: [
        {
          messageId: imageTitle,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 51,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute',
      code: `
<div>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: imageTitle,
          line: 2,
          column: 1,
          endLine: 4,
          endColumn: 7,
        },
      ],
    },
  ],
});
