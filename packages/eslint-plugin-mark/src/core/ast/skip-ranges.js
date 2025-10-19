/**
 * @fileoverview Class to manage skip ranges.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { SourceRange } from '@eslint/core';
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Class to manage skip ranges.
 */
export default class SkipRanges {
  // ------------------------------------------------------------------------------
  // Private Property
  // ------------------------------------------------------------------------------

  /** @type {Set<SourceRange>} */
  #skipRanges = new Set();

  // ------------------------------------------------------------------------------
  // Public Method
  // ------------------------------------------------------------------------------

  /**
   * Push a `range` to the set of skip ranges. (Method chaining supported.)
   * @param {SourceRange} range
   */
  push(range) {
    this.#skipRanges.add(range);

    return this;
  }

  /**
   * Check whether an `offset` is within the skip ranges.
   * @param {number} offset
   */
  isInSkipRange(offset) {
    return [...this.#skipRanges].some(
      skipRange => skipRange[0] <= offset && offset < skipRange[1],
    );
  }
}
