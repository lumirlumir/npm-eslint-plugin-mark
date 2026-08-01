/**
 * @fileoverview Type test for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import parser, { meta, parse, type ParseOptions } from '@eslint-markdown/parser';
import type { MarkdownLanguageOptions } from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region ParseOptions (type)

({}) as MarkdownLanguageOptions['frontmatter'] satisfies ParseOptions['frontmatter'];

// #endregion ParseOptions (type)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region meta (named export)

meta.name satisfies string;
meta.name satisfies '@eslint-markdown/parser';

meta.version satisfies string;

// #endregion meta (named export)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region parse (named export)

parse satisfies Function;

// #endregion parse (named export)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region parser (default export)

parser satisfies object;

// #endregion parser (default export)
// --------------------------------------------------------------------------------
