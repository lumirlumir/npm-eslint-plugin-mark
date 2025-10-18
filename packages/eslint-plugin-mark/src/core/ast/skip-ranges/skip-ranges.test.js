/**
 * @fileoverview Test for `skip-ranges.js`
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
import SkipRanges from './skip-ranges.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  describe('push()', () => {
    it('should push a range to the list of skip ranges', () => {
      const skipRanges = new SkipRanges();

      skipRanges.push([0, 1]).push([2, 3]);

      deepStrictEqual(skipRanges.skipRanges, [
        [0, 1],
        [2, 3],
      ]);
    });
  });

  describe('isOffsetInSkipRange()', () => {
    describe('Code', () => {
      it('```js\nconst hello = "world";\n```', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 32]);

        strictEqual(skipRanges.isOffsetInSkipRange(0), true);
        strictEqual(skipRanges.isOffsetInSkipRange(1), true);
        strictEqual(skipRanges.isOffsetInSkipRange(2), true);
        strictEqual(skipRanges.isOffsetInSkipRange(3), true);
        strictEqual(skipRanges.isOffsetInSkipRange(4), true);
        strictEqual(skipRanges.isOffsetInSkipRange(5), true);
        strictEqual(skipRanges.isOffsetInSkipRange(6), true);
        strictEqual(skipRanges.isOffsetInSkipRange(7), true);
        strictEqual(skipRanges.isOffsetInSkipRange(8), true);
        strictEqual(skipRanges.isOffsetInSkipRange(9), true);
        strictEqual(skipRanges.isOffsetInSkipRange(10), true);
        strictEqual(skipRanges.isOffsetInSkipRange(11), true);
        strictEqual(skipRanges.isOffsetInSkipRange(12), true);
        strictEqual(skipRanges.isOffsetInSkipRange(13), true);
        strictEqual(skipRanges.isOffsetInSkipRange(14), true);
        strictEqual(skipRanges.isOffsetInSkipRange(15), true);
        strictEqual(skipRanges.isOffsetInSkipRange(16), true);
        strictEqual(skipRanges.isOffsetInSkipRange(17), true);
        strictEqual(skipRanges.isOffsetInSkipRange(18), true);
        strictEqual(skipRanges.isOffsetInSkipRange(19), true);
        strictEqual(skipRanges.isOffsetInSkipRange(20), true);
        strictEqual(skipRanges.isOffsetInSkipRange(21), true);
        strictEqual(skipRanges.isOffsetInSkipRange(22), true);
        strictEqual(skipRanges.isOffsetInSkipRange(23), true);
        strictEqual(skipRanges.isOffsetInSkipRange(24), true);
        strictEqual(skipRanges.isOffsetInSkipRange(25), true);
        strictEqual(skipRanges.isOffsetInSkipRange(26), true);
        strictEqual(skipRanges.isOffsetInSkipRange(27), true);
        strictEqual(skipRanges.isOffsetInSkipRange(28), true);
        strictEqual(skipRanges.isOffsetInSkipRange(29), true);
        strictEqual(skipRanges.isOffsetInSkipRange(30), true);
        strictEqual(skipRanges.isOffsetInSkipRange(31), true);
        strictEqual(skipRanges.isOffsetInSkipRange(32), false);
        strictEqual(skipRanges.isOffsetInSkipRange(33), false);
      });
    });

    /*

    describe('InlineCode', () => {
      it('`hello`', () => {
        const ignoredPositions = new SkipRanges();

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
        const ignoredPositions = new SkipRanges();

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
        const ignoredPositions = new SkipRanges();

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
        const ignoredPositions = new SkipRanges();

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
        const ignoredPositions = new SkipRanges();

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

    */
  });
});
