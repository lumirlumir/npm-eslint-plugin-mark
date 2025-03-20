/**
 * @fileoverview Test for `code-lang-shorthand.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { test } from 'node:test';

import { ruleTesterCommonmark, ruleTesterGfm } from '../../core/rule-tester/index.js';
import rule from './code-lang-shorthand.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const { name } = rule.meta.docs;
const codeLangShorthand = 'codeLangShorthand';

// --------------------------------------------------------------------------------
// Testcases
// --------------------------------------------------------------------------------

const tests = {
  valid: [
    // Basic
    {
      name: 'No lang identifier',
      code: `\`\`\`
const foo = 'bar';
\`\`\``,
    },
    {
      name: 'Shorthand lang identifier',
      code: `\`\`\`js
const foo = 'bar';
\`\`\``,
    },

    // Options - ignores
    {
      name: 'Ignored lang identifier',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      options: [
        {
          ignores: ['javascript'],
        },
      ],
    },
    {
      name: 'Ignored lang identifiers',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\`

\`\`\`typescript
const foo = 'bar';
\`\`\``,
      options: [
        {
          ignores: ['javascript', 'typescript'],
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Non-shorthand lang identifier (javascript)',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (shell)',
      code: `\`\`\`shell
echo "Hello, World!"
\`\`\``,
      output: `\`\`\`sh
echo "Hello, World!"
\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 9,
        },
      ],
    },

    // Case-insensitive
    {
      name: 'Case-insensitive non-shorthand lang identifier (TypeScript)',
      code: `\`\`\`TypeScript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`ts
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Case-insensitive non-shorthand lang identifier (AsciiDoc)',
      code: `\`\`\`AsciiDoc
Hello, World!
\`\`\``,
      output: `\`\`\`adoc
Hello, World!
\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },

    // Code block with backticks and tilde
    {
      name: 'Code block with 4 backticks',
      code: `\`\`\`\`javascript
const foo = 'bar';
\`\`\`\``,
      output: `\`\`\`\`js
const foo = 'bar';
\`\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'Code block with 3 tildes',
      code: `~~~javascript
const foo = 'bar';
~~~`,
      output: `~~~js
const foo = 'bar';
~~~`,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },

    // Options - override
    {
      name: 'Override lang identifier (exsiting)',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`abc
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
      options: [
        {
          override: {
            javascript: 'abc',
          },
        },
      ],
    },
    {
      name: 'Override lang identifier (custom)',
      code: `\`\`\`abcdefg
1234567890
\`\`\``,
      output: `\`\`\`abc
1234567890
\`\`\``,
      errors: [
        {
          messageId: codeLangShorthand,
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            abcdefg: 'abc',
          },
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
