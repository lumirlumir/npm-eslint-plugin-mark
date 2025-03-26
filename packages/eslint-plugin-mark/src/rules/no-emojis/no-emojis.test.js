/**
 * @fileoverview Test for `no-emojis.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';
import rule from './no-emojis.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const { name } = rule.meta.docs;
const noEmojis = 'noEmojis';

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
          messageId: noEmojis,
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
          messageId: noEmojis,
          line: 1,
          column: 5,
        },
        {
          messageId: noEmojis,
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
