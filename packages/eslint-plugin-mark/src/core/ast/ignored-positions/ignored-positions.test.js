/**
 * @fileoverview Test for `ignored-positions.js`
 *
 * - The newline character (`\n`) is considered the last character of the current line.
 * - The newline character is always located at the end position (column) of the previous line,
 *   and new text starts at the first column (1) of the next line (line + 1).
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';

import { getFileName } from '../../tests/index.js';

import IgnoredPositions from './ignored-positions.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  describe('push()', () => {
    it('should push a position to the list of ignored positions', () => {
      const ignoredPositions = new IgnoredPositions();

      ignoredPositions
        .push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 5, offset: 4 },
        })
        .push({
          start: { line: 2, column: 1, offset: 5 },
          end: { line: 2, column: 5, offset: 9 },
        });

      deepStrictEqual(ignoredPositions.ignoredPositions, [
        {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 5, offset: 4 },
        },
        {
          start: { line: 2, column: 1, offset: 5 },
          end: { line: 2, column: 5, offset: 9 },
        },
      ]);
    });
  });

  describe('isIgnoredPoint()', () => {
    describe('Code', () => {
      it('```js\nconst hello = "world";\n```', () => {
        const ignoredPositions = new IgnoredPositions();

        ignoredPositions.push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 3, column: 4, offset: 32 },
        });

        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 4 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 5 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 6 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 4 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 5 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 6 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 7 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 8 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 9 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 10 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 11 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 12 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 13 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 14 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 15 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 16 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 17 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 18 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 19 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 20 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 21 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 22 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 23 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 3, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 3, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 3, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 3, column: 4 }), false);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 4, column: 1 }), false);
      });
    });

    describe('InlineCode', () => {
      it('`hello`', () => {
        const ignoredPositions = new IgnoredPositions();

        ignoredPositions.push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 8, offset: 7 },
        });

        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 4 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 5 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 6 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 7 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 8 }), false);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 9 }), false);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 1 }), false);
      });
    });

    describe('Strong', () => {
      it('**hello**', () => {
        const ignoredPositions = new IgnoredPositions();

        ignoredPositions.push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 10, offset: 9 },
        });

        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 4 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 5 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 6 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 7 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 8 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 9 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 10 }), false);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 1 }), false);
      });
    });

    describe('Text', () => {
      it('hello\nworld', () => {
        const ignoredPositions = new IgnoredPositions();

        ignoredPositions.push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 2, column: 6, offset: 11 },
        });

        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 4 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 5 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 1, column: 6 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 1 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 2 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 3 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 4 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 5 }), true);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 2, column: 6 }), false);
        strictEqual(ignoredPositions.isIgnoredPoint({ line: 3, column: 1 }), false);
      });
    });
  });

  describe('isIgnoredPosition()', () => {
    describe('Code', () => {
      it('```js\nconst hello = "world";\n```', () => {
        const ignoredPositions = new IgnoredPositions();

        ignoredPositions.push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 3, column: 4, offset: 32 },
        });

        // true
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 1 },
            end: { line: 3, column: 4 },
          }),
          true,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 1 },
            end: { line: 1, column: 2 },
          }),
          true,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 3, column: 3 },
            end: { line: 3, column: 4 },
          }),
          true,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 2 },
            end: { line: 3, column: 1 },
          }),
          true,
        );

        // false
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 1 },
            end: { line: 3, column: 5 },
          }),
          false,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 3, column: 4 },
            end: { line: 3, column: 5 },
          }),
          false,
        );
      });
    });

    describe('InlineCode', () => {
      it('`hello`', () => {
        const ignoredPositions = new IgnoredPositions();

        ignoredPositions.push({
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 8, offset: 7 },
        });

        // true
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 1 },
            end: { line: 1, column: 8 },
          }),
          true,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 1 },
            end: { line: 1, column: 2 },
          }),
          true,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 7 },
            end: { line: 1, column: 8 },
          }),
          true,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 2 },
            end: { line: 1, column: 7 },
          }),
          true,
        );

        // false
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 1 },
            end: { line: 1, column: 9 },
          }),
          false,
        );
        strictEqual(
          ignoredPositions.isIgnoredPosition({
            start: { line: 1, column: 8 },
            end: { line: 1, column: 9 },
          }),
          false,
        );
      });
    });
  });
});
