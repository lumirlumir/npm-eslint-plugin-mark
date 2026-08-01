/**
 * @fileoverview Entry file for the `@eslint-markdown/parser` package.
 * @see https://eslint.org/docs/latest/use/configure/parser
 * @see https://eslint.org/docs/latest/extend/custom-parsers
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { markdownToMdast, type Position } from 'satteri';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * An mdast JSON frontmatter node.
 */
export interface Json {
  type: 'json';
  value: string;
  data?: Record<string, unknown> | undefined;
  position?: Position | undefined;
}

declare module 'mdast' {
  interface FrontmatterContentMap {
    json: Json;
  }

  interface RootContentMap {
    json: Json;
  }
}

/**
 * The options for parsing markdown.
 */
export interface ParseOptions {
  /**
   * The options for parsing markdown.
   * @default 'commonmark'
   */
  mode?: 'commonmark' | 'gfm';

  /**
   * The options for parsing frontmatter.
   * @default false
   */
  frontmatter?: false | 'yaml' | 'toml' | 'json';

  /**
   * The options for parsing math.
   * @default false
   */
  math?: boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Parse Markdown source text into a materialized mdast syntax tree.
 *
 * By default, the source is parsed as CommonMark with frontmatter and math
 * syntax disabled. Set `mode` to `'gfm'` to enable GitHub Flavored Markdown
 * features such as tables, strikethrough, task lists, and footnotes.
 *
 * @param text The Markdown source text to parse.
 * @param options The parsing options. Defaults to CommonMark with frontmatter
 * and math disabled.
 * @returns The materialized mdast syntax tree.
 * @example Parse Markdown using the default CommonMark options.
 * ```js
 * import { parse } from '@eslint-markdown/parser';
 *
 * const ast = parse('# Hello, world!');
 *
 * console.log(ast.type);
 * // => 'root'
 * ```
 * @example Enable GFM, YAML frontmatter, and math syntax.
 * ```js
 * import { parse } from '@eslint-markdown/parser';
 *
 * const ast = parse('---\ntitle: Example\n---\n\n| A | B |\n| - | - |\n| 1 | 2 |', {
 *   mode: 'gfm',
 *   frontmatter: 'yaml',
 *   math: true,
 * });
 *
 * console.log(ast.type);
 * // => 'root'
 * ```
 */
export function parse(
  text: string,
  { mode = 'commonmark', frontmatter = false, math = false }: ParseOptions = {},
) {
  const ast = markdownToMdast(text, {
    features: {
      gfm: mode === 'gfm',
      frontmatter: frontmatter !== false,
      math,
    },
  });

  if (frontmatter === 'json' && ast.type === 'root') {
    const frontmatterNode = ast.children[0];

    if (frontmatterNode?.type === 'yaml') {
      ast.children[0] = {
        ...frontmatterNode,
        type: 'json',
      };
    }
  }

  return ast;
}
