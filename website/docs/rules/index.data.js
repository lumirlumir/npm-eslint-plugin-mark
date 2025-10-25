/**
 * @fileoverview Build time data for the `rules`.
 * @see https://vitepress.dev/guide/data-loading#data-from-local-files
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import mark from 'eslint-plugin-mark';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @typedef {object} RuleMeta
 * @property {string} name
 * @property {string} description
 * @property {boolean} recommended
 * @property {boolean} fixable
 * @property {boolean} suggestion
 * @property {boolean} commonmark
 * @property {boolean} gfm
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const { rules } = mark;
const ruleMetas = Object.keys(rules).map(
  rule =>
    /** @type {RuleMeta} */ ({
      name: rule,
      description: rules[rule].meta.docs.description ?? '',
      recommended: rules[rule].meta.docs.recommended ?? false,
      stylistic: rules[rule].meta.docs.stylistic ?? false,
      fixable: rules[rule].meta.fixable ?? false,
      suggestion: rules[rule].meta.docs.suggestion ?? false,
      commonmark: rules[rule].meta.dialects.includes('commonmark') ?? false,
      gfm: rules[rule].meta.dialects.includes('gfm') ?? false,
    }),
);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  load() {
    return {
      rules,
      ruleMetas,
    };
  },
};
