/**
 * @fileoverview Test for `code-lang-shorthand.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './code-lang-shorthand.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: [
    // Basic
    {
      name: 'Indented code block',
      code: `    Indented code block`,
    },
    {
      name: 'Fenced code block without lang - 1',
      code: `\`\`\`
Fenced code block without lang
\`\`\``,
    },
    {
      name: 'Fenced code block without lang - 2',
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

    // Options - allow
    {
      name: 'Allow lang identifier',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['javascript'],
        },
      ],
    },
    {
      name: 'Allow lang identifiers',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\`

\`\`\`typescript
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['javascript', 'typescript'],
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Non-shorthand lang identifier (javascript) - 1',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (javascript) - 2',
      code: `\`\`\` javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\` js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (javascript) - 3',
      code: `\`\`\`  javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`  js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (javascript) - 4',
      code: "```  javascript  \nconst foo = 'bar';\n```",
      output: "```  js  \nconst foo = 'bar';\n```",
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 16,
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
          messageId: 'codeLangShorthand',
          data: {
            lang: 'shell',
            langShorthand: 'sh',
          },
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
          messageId: 'codeLangShorthand',
          data: {
            lang: 'TypeScript',
            langShorthand: 'ts',
          },
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
          messageId: 'codeLangShorthand',
          data: {
            lang: 'AsciiDoc',
            langShorthand: 'adoc',
          },
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
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
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
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },

    // Options - override
    {
      name: 'Override lang identifier (existing)',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`abc
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'abc',
          },
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
          messageId: 'codeLangShorthand',
          data: {
            lang: 'abcdefg',
            langShorthand: 'abc',
          },
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
});
