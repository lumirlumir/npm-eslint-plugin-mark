/**
 * @fileoverview Type test for `index.js`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import plugin from 'eslint-markdown';
import type { ESLint, Linter } from 'eslint';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region plugin

plugin satisfies ESLint.Plugin;

// #endregion plugin
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region meta

plugin.meta.name satisfies 'eslint-markdown';
plugin.meta.version satisfies string;

// #endregion meta
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rules

type RuleName = keyof typeof plugin.rules;

'allow-image-url' satisfies RuleName;
'allow-link-url' satisfies RuleName;
'consistent-delete-style' satisfies RuleName;
'consistent-emphasis-style' satisfies RuleName;
'consistent-strong-style' satisfies RuleName;
'consistent-thematic-break-style' satisfies RuleName;
'no-control-character' satisfies RuleName;
'no-curly-quote' satisfies RuleName;
'no-double-space' satisfies RuleName;
'no-emoji' satisfies RuleName;
'no-git-conflict-marker' satisfies RuleName;
'no-irregular-dash' satisfies RuleName;
'no-irregular-whitespace' satisfies RuleName;
'no-url-trailing-slash' satisfies RuleName;
'require-image-title' satisfies RuleName;
'require-link-title' satisfies RuleName;

// #endregion rules
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region configs

plugin.configs.all satisfies Linter.Config;
plugin.configs.all.name satisfies 'mark/all';

plugin.configs.base satisfies Linter.Config;
plugin.configs.base.name satisfies 'mark/base';

plugin.configs.recommended satisfies Linter.Config;
plugin.configs.recommended.name satisfies 'mark/recommended';

plugin.configs.stylistic satisfies Linter.Config;
plugin.configs.stylistic.name satisfies 'mark/stylistic';

// #endregion configs
// --------------------------------------------------------------------------------
