/**
 * @fileoverview Test for `get-file-name.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import getFileName from './get-file-name.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  it('should return the file name of the module', () => {
    strictEqual(getFileName(import.meta.url), 'get-file-name');
  });
});
