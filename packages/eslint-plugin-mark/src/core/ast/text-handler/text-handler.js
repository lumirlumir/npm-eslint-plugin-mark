/**
 * @fileoverview Class to manage `Text` nodes.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ZERO_TO_ONE_BASED_OFFSET } from '../../constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { Text } from 'mdast';
 * @import { RuleContext } from '../../types.js';
 * @typedef {{value: string, position: Position}} Line
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const newLineRegex = /\r?\n/;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Class to manage `Text` nodes.
 * `TextHandler` transforms a multi-line `Text` node into separate single-line nodes,
 * each with `value` and `position` properties.
 */
export default class TextHandler {
  // ------------------------------------------------------------------------------
  // Private Properties
  // ------------------------------------------------------------------------------

  /** @type {Line[]} */
  #lines = [];

  /** @param {RuleContext} context @param {Text} textNode */
  constructor(context, textNode) {
    /**
     * - Supports both LF and CRLF line endings.
     * - In JavaScript, `\n` represents a newline character and splits text accordingly.
     *   However, in Markdown, writing `abcd\ndefg` treats `\n` as plain text (backslash + 'n'), not a newline.
     *   Only actual line breaks in Markdown (`abcd↵defg`) are stored as `"\n"` and split properly.
     */
    const lines = context.sourceCode.getText(textNode).split(newLineRegex);

    lines.forEach((line, lineNumber) => {
      const locLine = textNode.position.start.line + lineNumber;
      const locColumn =
        lineNumber === 0 ? textNode.position.start.column : ZERO_TO_ONE_BASED_OFFSET;
      let locOffset = textNode.position.start.offset;

      for (let i = 0; i < lineNumber; i++) {
        locOffset += lines[i].length + 1; // Add the lengths of previous lines. (`+1` for the newline character.)
      }

      this.#lines.push(
        /** @type {Line} */ {
          value: line,
          position: {
            start: {
              line: locLine,
              column: locColumn,
              offset: locOffset,
            },
            end: {
              line: locLine,
              column: locColumn + line.length,
              offset: locOffset + line.length,
            },
          },
        },
      );
    });
  }

  // ------------------------------------------------------------------------------
  // Getters and Setters
  // ------------------------------------------------------------------------------

  /**
   * Get the lines.
   */
  get lines() {
    return this.#lines;
  }
}
