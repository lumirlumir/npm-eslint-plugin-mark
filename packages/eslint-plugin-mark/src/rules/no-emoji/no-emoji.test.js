/**
 * @fileoverview Test for `no-emoji.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../../core/tests/index.js';
import rule from './no-emoji.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const noEmoji = 'noEmoji';

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
      name: 'Text without emojis',
      code: 'Hello, world!',
    },
  ],

  invalid: [
    {
      name: 'Singleline emoji',
      code: 'Hello, 😊!',
      errors: [
        {
          messageId: noEmoji,
          line: 1,
          column: 8,
        },
      ],
    },
    {
      name: 'Multiline emojis',
      code: `Hi, 😊
🦄!`,
      errors: [
        {
          messageId: noEmoji,
          line: 1,
          column: 5,
        },
        {
          messageId: noEmoji,
          line: 2,
          column: 1,
        },
      ],
    },
  ],
});
