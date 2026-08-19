/**
 * @fileoverview Utility to normalize a pattern option into a `RegExp`.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Normalizes a pattern option into a `RegExp`. String patterns are compiled with the `u` flag.
 * @param pattern `RegExp` or string pattern to normalize.
 * @returns The normalized `RegExp`.
 */
export default function normalizeRegexPattern(pattern: RegExp | string): RegExp {
  return typeof pattern === 'string' ? new RegExp(pattern, 'u') : pattern;
}
