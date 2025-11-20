/**
 * @fileoverview Check if a line is blank.
 * @see https://spec.commonmark.org/0.31.2/#blank-line
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const whitespaceChars = new Set([' ', '\t']);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Check if a line is blank.
 * @param {string} str Line string.
 * @returns {boolean} `true` if the line is blank. `false` otherwise.
 */
export default function isBlankLine(str) {
  for (let i = 0; i < str.length; i++) {
    if (!whitespaceChars.has(str[i])) {
      return false;
    }
  }

  return true;
}
