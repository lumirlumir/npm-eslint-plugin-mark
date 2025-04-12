/**
 * @fileoverview Test for `text-handler.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { deepStrictEqual } from 'node:assert';

import { getFileName } from '../../tests/index.js';

import TextHandler from './text-handler.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  it('should return correct lines: singleline', () => {
    const text = 'foo';
    const context = {
      sourceCode: {
        getText: () => text,
      },
    };
    const textNode = {
      position: {
        start: {
          line: 1,
          column: 3,
          offset: 2,
        },
      },
    };

    const textHandler = new TextHandler(context, textNode);

    deepStrictEqual(textHandler.lines, [
      {
        value: 'foo',
        position: {
          start: {
            line: 1,
            column: 3,
            offset: 2,
          },
          end: {
            line: 1,
            column: 6,
            offset: 5,
          },
        },
      },
    ]);
  });

  it('should return correct lines: multiline', () => {
    const text = `foo
  bar
baz`;
    const context = {
      sourceCode: {
        getText: () => text,
      },
    };
    const textNode = {
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
      },
    };

    const textHandler = new TextHandler(context, textNode);

    deepStrictEqual(textHandler.lines, [
      {
        value: 'foo',
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 4,
            offset: 3,
          },
        },
      },
      {
        value: '  bar',
        position: {
          start: {
            line: 2,
            column: 1,
            offset: 4,
          },
          end: {
            line: 2,
            column: 6,
            offset: 9,
          },
        },
      },
      {
        value: 'baz',
        position: {
          start: {
            line: 3,
            column: 1,
            offset: 10,
          },
          end: {
            line: 3,
            column: 4,
            offset: 13,
          },
        },
      },
    ]);
  });
});
