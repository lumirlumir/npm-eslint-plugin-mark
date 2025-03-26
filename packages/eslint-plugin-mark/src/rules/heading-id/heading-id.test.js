/**
 * @fileoverview Test for `heading-id.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';
import rule from './heading-id.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const { name } = rule.meta.docs;
const headingId = 'headingId';

// --------------------------------------------------------------------------------
// Testcases
// --------------------------------------------------------------------------------

const tests = {
  valid: [
    // Default
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty String',
      code: '  ',
    },
    {
      name: 'Correct h1 heading ID',
      code: '# Heading {#id}',
    },
    {
      name: 'Correct h2 heading ID',
      code: '## Heading {#id}',
    },
    {
      name: 'Correct h3 heading ID',
      code: '### Heading {#id}',
    },
    {
      name: 'Correct h4 heading ID',
      code: '#### Heading {#id}',
    },
    {
      name: 'Correct h5 heading ID',
      code: '##### Heading {#id}',
    },
    {
      name: 'Correct h6 heading ID',
      code: '###### Heading {#id}',
    },

    // Default: Edge Cases
    {
      name: 'h1 heading ID and trailing spaces',
      code: '# Heading {#id}  ',
    },
  ],

  invalid: [
    // Default
    {
      name: 'Missing h1 heading ID',
      code: '# Heading',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Missing h2 heading ID',
      code: '## Heading',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Missing h3 heading ID',
      code: '### Heading',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Missing h4 heading ID',
      code: '#### Heading',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'Missing h5 heading ID',
      code: '##### Heading',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Missing h6 heading ID',
      code: '###### Heading',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },

    // Default: Edge Cases
    {
      name: 'h1 heading ID with nothing',
      code: '# Heading {#}',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'h1 heading ID with leading space',
      code: '# Heading { #id}',
      errors: [
        {
          messageId: headingId,
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 17,
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
