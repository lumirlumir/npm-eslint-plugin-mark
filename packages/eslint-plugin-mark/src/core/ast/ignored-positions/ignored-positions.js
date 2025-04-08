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
  // Static Methods
  // ------------------------------------------------------------------------------

  /**
   * Check if a point is in the ignored position.
   * @param {Point} point
   * @param {Position} position
   */
  static isIgnoredPoint(point, position) {
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
        (position.end.line === point.line && point.column < position.end.column) // Before the end column of the end line.
      );
    }
  }

  // ------------------------------------------------------------------------------
  // Public Methods
  // ------------------------------------------------------------------------------

  /**
   * Push a position to the list of ignored positions.
   * @param {Position} position
   */
  push(position) {
    this.#ignoredPositions.push(position);

    return this;
  }

  /**
   * Check if a point is in the ignored positions.
   * @param {Point} point
   */
  isIgnoredPoint(point) {
    return this.#ignoredPositions.some(ignoredPosition =>
      IgnoredPositions.isIgnoredPoint(point, ignoredPosition),
    );
  }

  /**
   * Check if a position is in the ignored positions.
   * @param {Position} position
   */
  isIgnoredPosition(position) {
    return this.#ignoredPositions.some(
      ignoredPosition =>
        IgnoredPositions.isIgnoredPoint(position.start, ignoredPosition) &&
        IgnoredPositions.isIgnoredPoint(
          { line: position.end.line, column: position.end.column - 1 }, // Since it's an open interval, we subtract 1 from the column only.
          ignoredPosition,
        ),
    );
  }

  // ------------------------------------------------------------------------------
  // Getters and Setters
  // ------------------------------------------------------------------------------

  /**
   * Get the ignored positions.
   */
  get ignoredPositions() {
    return this.#ignoredPositions;
  }
}
