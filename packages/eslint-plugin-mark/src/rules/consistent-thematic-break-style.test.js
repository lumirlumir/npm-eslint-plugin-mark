/**
 * @fileoverview Test for `consistent-thematic-break-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './consistent-thematic-break-style.js';

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
      name: '`consistent` style - 1',
      code: '---',
    },
    {
      name: '`consistent` style - 2',
      code: '---\n\n---\n\n---',
    },
  ],

  invalid: [
    {
      name: '`consistent` style - 1',
      code: '---\n\n***\n\n___\n\n---',
      output: '---\n\n---\n\n---\n\n---',
      errors: [
        {
          messageId: 'consistentThematicBreakStyle',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
        },
        {
          messageId: 'consistentThematicBreakStyle',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
        },
      ],
    },
    {
      name: '`consistent` style - 2',
      code: '***\n\n___\n\n---\n\n***',
      output: '***\n\n***\n\n***\n\n***',
      errors: [
        {
          messageId: 'consistentThematicBreakStyle',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
        },
        {
          messageId: 'consistentThematicBreakStyle',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
        },
      ],
    },
    {
      name: '`consistent` style - 3',
      code: '___\n\n---\n\n***\n\n___',
      output: '___\n\n___\n\n___\n\n___',
      errors: [
        {
          messageId: 'consistentThematicBreakStyle',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
        },
        {
          messageId: 'consistentThematicBreakStyle',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
        },
      ],
    },
  ],
});
