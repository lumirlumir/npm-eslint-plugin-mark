/**
 * @fileoverview Test for `no-git-conflict-marker.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { getFileName } from '../../core/helpers/index.js';
import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';

import rule from './no-git-conflict-marker.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const name = getFileName(import.meta.url);
const noGitConflictMarker = 'noGitConflictMarker';

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
      name: '`<` repeats 8 times',
      code: '<<<<<<<<',
    },
    {
      name: '`=` repeats 8 times',
      code: '========',
    },
    {
      name: '`>` repeats 8 times',
      code: '>>>>>>>>',
    },
  ],

  invalid: [
    // Basic
    {
      name: '`<` repeats 7 times',
      code: '<<<<<<<',
      errors: [
        {
          messageId: noGitConflictMarker,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: '`=` repeats 7 times',
      code: '=======',
      errors: [
        {
          messageId: noGitConflictMarker,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: '`>` repeats 7 times',
      code: '>>>>>>>',
      errors: [
        {
          messageId: noGitConflictMarker,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
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
