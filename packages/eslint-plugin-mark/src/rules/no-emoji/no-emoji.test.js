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
      // 😊's length 2.
      name: 'Singleline emoji',
      code: 'Hello, 😊!',
      errors: [
        {
          messageId: noEmoji,
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // 😊's length 2, 🦄's length 2.
      name: 'Multiline emojis - 1',
      code: `Hi, 😊
🦄!`,
      errors: [
        {
          messageId: noEmoji,
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
        {
          messageId: noEmoji,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Multiline emojis - 2',
      code: `Hi, 😊
  🦄!`,
      errors: [
        {
          messageId: noEmoji,
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
        {
          messageId: noEmoji,
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
  ],
});
