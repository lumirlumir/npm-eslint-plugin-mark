/**
 * @fileoverview Get the file name of the module.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import { parse } from 'node:path';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Get the file name of the module.
 * @param {string} importMetaUrl The absolute `file:` URL of the module.
 * @returns {string} The file name of the module.
 */
export default function getFileName(importMetaUrl) {
  return parse(fileURLToPath(importMetaUrl)).name.replace(/\.test$/, '');
}
