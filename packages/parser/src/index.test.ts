/**
 * @fileoverview Tests for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { parse } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('parse', () => {
  it('should parse Markdown as CommonMark by default', () => {
    const ast = parse('# Hello');

    assert(ast.type === 'root');
    assert.strictEqual(ast.children.length, 1);

    const heading = ast.children[0];

    assert(heading?.type === 'heading');
    assert.strictEqual(heading.depth, 1);
    assert.strictEqual(heading.children[0]?.type, 'text');
    assert.strictEqual(heading.children[0].value, 'Hello');
  });

  it('should enable tables only in GFM mode', () => {
    const markdown = '| A | B |\n| - | - |\n| 1 | 2 |';
    const commonmarkAst = parse(markdown);
    const gfmAst = parse(markdown, { mode: 'gfm' });

    assert(commonmarkAst.type === 'root');
    assert(gfmAst.type === 'root');
    assert.strictEqual(commonmarkAst.children[0]?.type, 'paragraph');
    assert.strictEqual(gfmAst.children[0]?.type, 'table');
  });

  it('should parse YAML frontmatter when enabled', () => {
    const ast = parse('---\ntitle: Example\n---\n\n# Hello', {
      frontmatter: 'yaml',
    });

    assert(ast.type === 'root');

    const frontmatter = ast.children[0];

    assert(frontmatter?.type === 'yaml');
    assert.strictEqual(frontmatter.value, 'title: Example');
  });

  it('should parse TOML frontmatter when enabled', () => {
    const ast = parse('+++\ntitle = "Example"\n+++\n\n# Hello', {
      frontmatter: 'toml',
    });

    assert(ast.type === 'root');

    const frontmatter = ast.children[0];

    assert(frontmatter?.type === 'toml');
    assert.strictEqual(frontmatter.value, 'title = "Example"');
  });

  it('should parse inline and block math when enabled', () => {
    const ast = parse('Inline $x$ and block:\n\n$$\ny = 2\n$$', { math: true });

    assert(ast.type === 'root');

    const paragraph = ast.children[0];
    const math = ast.children[1];

    assert(paragraph?.type === 'paragraph');
    assert.strictEqual(paragraph.children[1]?.type, 'inlineMath');
    assert.strictEqual(paragraph.children[1].value, 'x');
    assert(math?.type === 'math');
    assert.strictEqual(math.value, 'y = 2');
  });

  it('should parse JSON frontmatter when enabled', () => {
    const ast = parse('---\n{\n  "title": "Example"\n}\n---\n\n# Hello', {
      frontmatter: 'json',
    });

    assert(ast.type === 'root');

    const frontmatter = ast.children[0];

    assert(frontmatter?.type === 'json');
    assert.strictEqual(frontmatter.value, '{\n  "title": "Example"\n}');
  });
});
