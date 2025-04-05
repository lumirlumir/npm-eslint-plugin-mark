/**
 * @fileoverview Test for `no-double-spaces.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { getFileName } from '../../core/helpers/index.js';
import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';

import rule from './no-double-spaces.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const name = getFileName(import.meta.url);
const noDoubleSpaces = 'noDoubleSpaces';
const noMultipleSpaces = 'noMultipleSpaces';

// --------------------------------------------------------------------------------
// Testcases
// --------------------------------------------------------------------------------

const tests = {
  valid: [
    // Double spaces.
    '  ', // Empty string with double spaces.
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

    // Multiple spaces.
    {
      name: 'Empty string with multiple spaces',
      code: '  ',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'A single space between words',
      code: 'foo bar baz',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'A single leading space',
      code: ' foo bar baz',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Double leading space',
      code: '  foo bar baz',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Triple leading space',
      code: '   foo bar baz',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Multiple (more than three) leading space',
      code: '    foo bar baz',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'A single trailing space',
      code: 'foo bar baz ',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Double trailing space',
      code: 'foo bar baz  ',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Triple trailing space',
      code: 'foo bar baz   ',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Multiple (more than three) trailing space',
      code: 'foo bar baz    ',
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
  ],

  invalid: [
    // double spaces: single line
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

    // double spaces: multiple lines
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
    {
      name: 'Double space with newline and leading spaces',
      code: `foo   bar
      foo  bar
foo bar  baz
          foo bar
`,
      output: `foo   bar
      foo bar
foo bar baz
          foo bar
`,
      errors: [
        {
          messageId: noDoubleSpaces,
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 12,
        },
        {
          messageId: noDoubleSpaces,
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 10,
        },
      ],
    },

    // multiple spaces: single line
    {
      name: 'Multiple space between words',
      code: 'foo   bar baz',
      output: 'foo bar baz',
      errors: [
        {
          messageId: noMultipleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 7,
        },
      ],
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },
    {
      name: 'Multiple spaces between words',
      code: 'foo  bar   baz    qux',
      output: 'foo bar baz qux',
      errors: [
        {
          messageId: noMultipleSpaces,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: noMultipleSpaces,
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 12,
        },
        {
          messageId: noMultipleSpaces,
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 19,
        },
      ],
      options: [
        {
          multipleSpaces: true,
        },
      ],
    },

    // multiple spaces: multiple lines
    {
      name: 'Multiple spaces with newline and leading spaces',
      code: `foo
  bar   baz  qux
quux`,
      output: `foo
  bar baz qux
quux`,
      errors: [
        {
          messageId: noMultipleSpaces,
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 9,
        },
        {
          messageId: noMultipleSpaces,
          line: 2,
          column: 12,
          endLine: 2,
          endColumn: 14,
        },
      ],
      options: [
        {
          multipleSpaces: true,
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
