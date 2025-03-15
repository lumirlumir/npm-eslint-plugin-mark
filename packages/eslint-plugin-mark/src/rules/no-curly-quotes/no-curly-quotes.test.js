/**
 * @fileoverview Test for `no-curly-quotes.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';
import rule from './no-curly-quotes.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const { name } = rule.meta.docs;
const noCurlyQuotes = 'noCurlyQuotes';

// --------------------------------------------------------------------------------
// Testcases
// --------------------------------------------------------------------------------

const tests = {
  valid: ['', ' ', '"', "'"],

  invalid: [
    {
      name: 'Left double quotation mark in raw text',
      code: '“',
      output: '"',
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right double quotation mark in raw text',
      code: '”',
      output: '"',
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Left single quotation mark in raw text',
      code: '‘',
      output: "'",
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right single quotation mark in raw text',
      code: '’',
      output: "'",
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Left double quotation mark in unicode escape',
      code: '\u201C foo',
      output: '" foo',
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right double quotation mark in unicode escape',
      code: '\u201D foo',
      output: '" foo',
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Left single quotation mark in unicode escape',
      code: '\u2018 foo',
      output: "' foo",
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right single quotation mark in unicode escape',
      code: '\u2019 foo',
      output: "' foo",
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Mixed curly quotes in raw text',
      code: `“foo” ‘bar’
  “  ”
‘  ’`,
      output: `"foo" 'bar'
  "  "
'  '`,
      errors: [
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
        },
        {
          messageId: noCurlyQuotes,
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
        {
          messageId: noCurlyQuotes,
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
        },
        {
          messageId: noCurlyQuotes,
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
        },
        {
          messageId: noCurlyQuotes,
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
        },
        {
          messageId: noCurlyQuotes,
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
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
