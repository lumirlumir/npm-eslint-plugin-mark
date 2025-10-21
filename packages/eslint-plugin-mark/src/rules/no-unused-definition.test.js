/**
 * @fileoverview Test for `no-unused-definition.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './no-unused-definition.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const noUnusedDefinition = 'noUnusedDefinition';

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
      name: 'Image reference full with definition',
      code: '![foo][foo]\n\n[foo]: bar',
    },
    {
      name: 'Image reference collapsed with definition',
      code: '![foo][]\n\n[foo]: bar',
    },
    {
      name: 'Image reference shortcut with definition',
      code: '![foo]\n\n[foo]: bar',
    },

    {
      name: 'Link reference full with definition',
      code: '[foo][foo]\n\n[foo]: bar',
    },
    {
      name: 'Link reference collapsed with definition',
      code: '[foo][]\n\n[foo]: bar',
    },
    {
      name: 'Link reference shortcut with definition',
      code: '[foo]\n\n[foo]: bar',
    },

    {
      name: 'Image and Link reference with definition',
      code: '![foo][foo]\n\n[foo][foo]\n\n[foo]: bar',
    },
  ],

  invalid: [
    {
      name: 'Unused definition - 1',
      code: '[foo]: bar',
      errors: [
        {
          messageId: noUnusedDefinition,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Unused definition - 2',
      code: '[foo][foo]\n\n[bar]: baz',
      errors: [
        {
          messageId: noUnusedDefinition,
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
        },
      ],
    },
  ],
});
