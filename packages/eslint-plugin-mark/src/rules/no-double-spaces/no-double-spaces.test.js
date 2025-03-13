/**
 * @fileoverview Test for `no-double-spaces.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { RuleTester } from 'eslint';
import markdown from '@eslint/markdown';

import rule from './no-double-spaces.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const noDoubleSpaces = 'noDoubleSpaces';

const ruleTesterCommonmark = new RuleTester({
  plugins: {
    markdown,
  },
  language: 'markdown/commonmark',
});

const ruleTesterGfm = new RuleTester({
  plugins: {
    markdown,
  },
  language: 'markdown/gfm',
});

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

const tests = {
  valid: [
    'foo bar baz', // A single space between words.
    'foo   bar baz', // Triple space between words.
    'foo bar    baz', // Multiple (more than three) space between words.
    'foo    bar    baz', // Multiple (more than three) spaces between words.
    ' foo bar baz', // A single leading space.
    '  foo bar baz', // Double leading space.
    '   foo bar baz', // Triple leading space.
    '    foo bar baz', // Multiple (more than three) leading space.
    'foo bar baz ', // A single trailing space.
    'foo bar baz  ', // Double trailing space.
    'foo bar baz   ', // Triple trailing space.
    'foo bar baz    ', // Multiple (more than three) trailing space.
    `foo
bar baz`, // A single newline between words.
    `foo
bar    baz
qux
`, // Multiple (more than three) spaces and newlines between words.
    'foo\n\nbar baz', // A single newline between words.
    'foo\n\n\nbar baz', // Triple newlines between words.
    'foo\t\tbar baz', // A single tab between words.
    'foo\t\t\tbar baz', // Triple tabs between words.
  ],

  invalid: [
    // single line
    {
      name: 'Double space between words',
      code: 'foo  bar baz',
      output: 'foo bar baz',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Double spaces between words',
      code: 'foo  bar  baz  qux',
      output: 'foo bar baz qux',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 11,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Double and Triple space between words',
      code: 'foo  bar   baz',
      output: 'foo bar   baz',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Double space with leading spaces',
      code: '  foo  bar baz',
      output: '  foo bar baz',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Double spaces with leading spaces',
      code: '  foo  bar  baz  qux',
      output: '  foo bar baz qux',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 8,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 13,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 18,
        },
      ],
    },
    {
      name: 'Double space with trailing spaces',
      code: 'foo  bar baz  ',
      output: 'foo bar baz  ',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Double spaces with trailing spaces',
      code: 'foo  bar  baz  qux  ',
      output: 'foo bar baz qux  ',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 11,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Double space with leading and trailing spaces',
      code: '  foo  bar baz  ',
      output: '  foo bar baz  ',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Double spaces with leading and trailing spaces',
      code: '  foo  bar  baz  qux  ',
      output: '  foo bar baz qux  ',
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 8,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 13,
        },
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 18,
        },
      ],
    },

    // multiple lines
    {
      name: 'Double space with newline',
      code: `foo
bar  baz`,
      output: `foo
bar baz`,
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Double spaces with newline',
      code: `foo
bar  baz
qux quux  quuz`,
      output: `foo
bar baz
qux quux quuz`,
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
        {
          messageId: noDoubleSpaces,
          line: 3,
          column: 9,
          endLine: 3,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Double space with newline and leading spaces',
      code: `foo
  bar  baz`,
      output: `foo
  bar baz`,
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Double space with newline and leading spaces',
      code: `foo  bar
  bar baz`,
      output: `foo bar
  bar baz`,
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
  ],
};

test('no-double-spaces', () => {
  ruleTesterCommonmark.run('no-double-spaces', rule, tests);
  ruleTesterGfm.run('no-double-spaces', rule, tests);
});
