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
  isOffsetInSkipRange(offset) {
    return [...this.#skipRanges].some(
      skipRange => skipRange[0] <= offset && offset < skipRange[1],
    );
  }

  /**
   * Check whether a `range` is within the skip ranges.
   * @param {SourceRange} range
   */
  isRangeInSkipRange(range) {
    return [...this.#skipRanges].some(
      skipRange => skipRange[0] <= range[0] && range[1] < skipRange[1],
    );
  }

  // ------------------------------------------------------------------------------
  // Getter and Setter
  // ------------------------------------------------------------------------------

  /**
   * Get the skip ranges.
   */
  get skipRanges() {
    return [...this.#skipRanges];
  }
}
