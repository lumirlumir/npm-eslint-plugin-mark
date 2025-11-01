/**
 * @fileoverview Test for `html.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { ok } from 'node:assert';
import { getFileName } from '../tests/index.js';
import getElementsByTagName from './html.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const html = '<p>hello world</p>';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  it('should have `sourceCodeLocation` property', () => {
    const elements = getElementsByTagName(html, 'p');

    ok(elements[0].sourceCodeLocation);
  });
});
