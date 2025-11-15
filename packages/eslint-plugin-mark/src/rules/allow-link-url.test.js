/**
 * @fileoverview Test for `allow-link-url.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './allow-link-url.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: ['', '  '],

  invalid: [],
});
