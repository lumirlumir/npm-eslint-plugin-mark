/**
 * @fileoverview Test for `to-regexp.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import toRegExp from './to-regexp.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('to-regexp', () => {
  it('should compile a string pattern without flags', () => {
    const regex = toRegExp('example\\.com');

    assert.strictEqual(regex.source, 'example\\.com');
    assert.strictEqual(regex.flags, '');
  });

  it('should return a `RegExp` as is', () => {
    const regex = /example\.com/u;

    assert.strictEqual(toRegExp(regex), regex);
  });

  it('should throw on an invalid string pattern', () => {
    assert.throws(() => toRegExp('('), SyntaxError);
  });
});
