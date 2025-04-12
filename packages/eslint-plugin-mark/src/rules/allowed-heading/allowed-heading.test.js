/**
 * @fileoverview Test for `allowed-heading.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../../core/tests/index.js';
import rule from './allowed-heading.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const allowedHeading = 'allowedHeading';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
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
      name: 'Headings should not be reported by default',
      code: `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`,
    },

    // Options
    {
      name: 'Headings should not be reported when they are allowed',
      code: `
# Hello
# World

## Hello
## World

### Hello
### World

#### Hello
#### World

##### Hello
##### World

###### Hello
###### World
`,
      options: [
        {
          h1: ['Hello', 'World'],
          h2: ['Hello', 'World'],
          h3: ['Hello', 'World'],
          h4: ['Hello', 'World'],
          h5: ['Hello', 'World'],
          h6: ['Hello', 'World'],
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Headings should be reported when they are not allowed - h1',
      code: '# Hello',
      options: [
        {
          h1: ['World'],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h2',
      code: '## Hello',
      options: [
        {
          h2: ['World'],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 9,
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h3',
      code: '### Hello',
      options: [
        {
          h3: ['World'],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h4',
      code: '#### Hello',
      options: [
        {
          h4: ['World'],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h5',
      code: '##### Hello',
      options: [
        {
          h5: ['World'],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h6',
      code: '###### Hello',
      options: [
        {
          h6: ['World'],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },

    // Edge Cases
    {
      name: 'Specific level headings should be reported entirely when empty array option is given - h1',
      code: '# Hello\n# World',
      options: [
        {
          h1: [],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
        },
        {
          messageId: allowedHeading,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Specific level headings should be reported entirely when empty array option is given - h2',
      code: '## Hello\n## World',
      options: [
        {
          h2: [],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 9,
        },
        {
          messageId: allowedHeading,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 9,
        },
      ],
    },
    {
      name: 'Specific level headings should be reported entirely when empty array option is given - h3',
      code: '### Hello\n### World',
      options: [
        {
          h3: [],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
        },
        {
          messageId: allowedHeading,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Specific level headings should be reported entirely when empty array option is given - h4',
      code: '#### Hello\n#### World',
      options: [
        {
          h4: [],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
        },
        {
          messageId: allowedHeading,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Specific level headings should be reported entirely when empty array option is given - h5',
      code: '##### Hello\n##### World',
      options: [
        {
          h5: [],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
        },
        {
          messageId: allowedHeading,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Specific level headings should be reported entirely when empty array option is given - h6',
      code: '###### Hello\n###### World',
      options: [
        {
          h6: [],
        },
      ],
      errors: [
        {
          messageId: allowedHeading,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
        },
        {
          messageId: allowedHeading,
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 13,
        },
      ],
    },
  ],
});
