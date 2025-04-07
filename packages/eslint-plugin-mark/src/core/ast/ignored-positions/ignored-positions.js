/**
 * @fileoverview Class to manage ignored positions.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("unist").Point} Point
 * @typedef {import("unist").Position} Position
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Class to manage ignored positions.
 */
export default class IgnoredPositions {
  // ------------------------------------------------------------------------------
  // Private Properties
  // ------------------------------------------------------------------------------

  /** @type {Position[]} */
  #ignoredPositions = [];

  // ------------------------------------------------------------------------------
  // Public Methods
  // ------------------------------------------------------------------------------

  /**
   * Push a position to the list of ignored positions.
   * @param {Position} position
   */
  push(position) {
    this.#ignoredPositions.push(position);
  }

  /**
   * Check if a point is in the ignored positions.
   * @param {Point} point
   */
  isIgnoredPoint(point) {
    return this.#ignoredPositions.some(position => {
      const isPositionSingleLine = position.start.line === position.end.line;

      if (isPositionSingleLine) {
        return (
          position.start.line === point.line &&
          position.start.column <= point.column &&
          point.column < position.end.column
        );
      } else {
        return (
          (position.start.line < point.line && point.line < position.end.line) || // Middle line.
          (position.start.line === point.line && position.start.column <= point.column) || // After the start column of the start line.
          (position.end.line === point.line && point.column < position.end.column)
        ); // Before the end column of the end line.
      }
    });
  }
}
