/**
 * @fileoverview Utility to test a regular expression without mutating its state.
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const statefulRegexFlagRegex = /[gy]/u;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Tests a regular expression pattern without mutating the `lastIndex` of a `RegExp` input.
 * @param pattern RegExp or string pattern to test.
 * @param text Text to test.
 * @returns Whether the pattern matches the text.
 */
export default function testRegexStateless(pattern: RegExp | string, text: string) {
  const normalizedRegex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

  return statefulRegexFlagRegex.test(normalizedRegex.flags)
    ? new RegExp(normalizedRegex).test(text)
    : normalizedRegex.test(text);
}
