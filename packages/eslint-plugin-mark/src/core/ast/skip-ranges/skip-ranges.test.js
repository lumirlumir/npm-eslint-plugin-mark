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
import { strictEqual } from 'node:assert';
import { getFileName } from '../../tests/index.js';
import SkipRanges from './skip-ranges.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  describe('push()', () => {
    it('should push a range to the list of skip ranges', () => {
      const skipRanges = new SkipRanges();

      skipRanges.push([0, 1]);
      skipRanges.push([2, 3]).push([4, 5]);
    });
  });

  describe('isInSkipRange()', () => {
    describe('Code', () => {
      it('```js\nconst hello = "world";\n```', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 32]);

        strictEqual(skipRanges.isInSkipRange(0), true);
        strictEqual(skipRanges.isInSkipRange(1), true);
        strictEqual(skipRanges.isInSkipRange(2), true);
        strictEqual(skipRanges.isInSkipRange(3), true);
        strictEqual(skipRanges.isInSkipRange(4), true);
        strictEqual(skipRanges.isInSkipRange(5), true);
        strictEqual(skipRanges.isInSkipRange(6), true);
        strictEqual(skipRanges.isInSkipRange(7), true);
        strictEqual(skipRanges.isInSkipRange(8), true);
        strictEqual(skipRanges.isInSkipRange(9), true);
        strictEqual(skipRanges.isInSkipRange(10), true);
        strictEqual(skipRanges.isInSkipRange(11), true);
        strictEqual(skipRanges.isInSkipRange(12), true);
        strictEqual(skipRanges.isInSkipRange(13), true);
        strictEqual(skipRanges.isInSkipRange(14), true);
        strictEqual(skipRanges.isInSkipRange(15), true);
        strictEqual(skipRanges.isInSkipRange(16), true);
        strictEqual(skipRanges.isInSkipRange(17), true);
        strictEqual(skipRanges.isInSkipRange(18), true);
        strictEqual(skipRanges.isInSkipRange(19), true);
        strictEqual(skipRanges.isInSkipRange(20), true);
        strictEqual(skipRanges.isInSkipRange(21), true);
        strictEqual(skipRanges.isInSkipRange(22), true);
        strictEqual(skipRanges.isInSkipRange(23), true);
        strictEqual(skipRanges.isInSkipRange(24), true);
        strictEqual(skipRanges.isInSkipRange(25), true);
        strictEqual(skipRanges.isInSkipRange(26), true);
        strictEqual(skipRanges.isInSkipRange(27), true);
        strictEqual(skipRanges.isInSkipRange(28), true);
        strictEqual(skipRanges.isInSkipRange(29), true);
        strictEqual(skipRanges.isInSkipRange(30), true);
        strictEqual(skipRanges.isInSkipRange(31), true);
        strictEqual(skipRanges.isInSkipRange(32), false);
        strictEqual(skipRanges.isInSkipRange(33), false);
      });
    });

    describe('InlineCode', () => {
      it('`hello`', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 7]);

        strictEqual(skipRanges.isInSkipRange(0), true);
        strictEqual(skipRanges.isInSkipRange(1), true);
        strictEqual(skipRanges.isInSkipRange(2), true);
        strictEqual(skipRanges.isInSkipRange(3), true);
        strictEqual(skipRanges.isInSkipRange(4), true);
        strictEqual(skipRanges.isInSkipRange(5), true);
        strictEqual(skipRanges.isInSkipRange(6), true);
        strictEqual(skipRanges.isInSkipRange(7), false);
        strictEqual(skipRanges.isInSkipRange(8), false);
        strictEqual(skipRanges.isInSkipRange(9), false);
      });
    });

    /*

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

  */
  });
});
