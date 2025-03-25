/**
 * @fileoverview Get the URL for the rule documentation based on the rule name.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../../constants.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Get the URL for the rule documentation based on the rule name.
 *
 * @param {string} ruleName The name of the rule.
 * @returns {string} The URL for the rule documentation.
 */
export default function getRuleDocsUrl(ruleName) {
  return `${URL_RULE_DOCS}${ruleName}`;
}
