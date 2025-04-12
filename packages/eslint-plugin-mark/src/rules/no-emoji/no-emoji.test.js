/**
 * @fileoverview Test for `no-emoji.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { getFileName } from '../../core/tests/index.js';
import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';

import rule from './no-emoji.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const name = getFileName(import.meta.url);
const noEmoji = 'noEmoji';

// --------------------------------------------------------------------------------
// Testcases
// --------------------------------------------------------------------------------

const tests = {
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
};

// --------------------------------------------------------------------------------
// Test Runner
// --------------------------------------------------------------------------------

test(name, () => {
  ruleTesterCommonmark.run(name, rule, tests);
  ruleTesterGfm.run(name, rule, tests);
});
