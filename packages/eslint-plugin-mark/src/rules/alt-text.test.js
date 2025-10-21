/**
 * @fileoverview Test for `alt-text.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './alt-text.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const altText = 'altText';

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
      name: 'Image node with alt text',
      code: '![alt text](https://example.com/image.jpg)',
    },
    {
      name: 'ImageReference node with alt text',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg
`,
    },
    {
      name: 'Html node with alt text',
      code: '<img src="https://example.com/image.jpg" alt="alt text">',
    },
    {
      name: 'Nested Html node with alt text',
      code: `
<div>
  <img src="https://example.com/image.jpg" alt="alt text">
</div>
`,
    },
  ],

  invalid: [
    {
      name: 'Image node without alt text',
      code: '![](https://example.com/image.jpg)',
      errors: [
        {
          messageId: altText,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 35,
        },
      ],
    },
    {
      name: 'ImageReference node without alt text',
      code: `
![][image]

[image]: https://example.com/image.jpg
`,
      errors: [
        {
          messageId: altText,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Html node without alt text',
      code: '<img src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: altText,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'Html node with empty alt text',
      code: '<img src="https://example.com/image.jpg" alt="">',
      errors: [
        {
          messageId: altText,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 49,
        },
      ],
    },
    {
      name: 'Html node with empty alt text - 2',
      code: '<img src="https://example.com/image.jpg" alt>',
      errors: [
        {
          messageId: altText,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 46,
        },
      ],
    },
    {
      name: 'Nested Html node without alt text',
      code: `
<div>
  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>
  <a href="https://www.google.com">google</a><br>
  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>
</div>
`,
      errors: [
        {
          messageId: altText,
          line: 2,
          column: 1,
          endLine: 6,
          endColumn: 7,
        },
        {
          messageId: altText,
          line: 2,
          column: 1,
          endLine: 6,
          endColumn: 7,
        },
      ],
    },
  ],
});
