/**
 * @fileoverview Tests for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import parser, { meta, parse } from './index.js';
import pkg from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('named export', () => {
    describe('meta', () => {
      it('should have a `name` property', () => {
        assert.strictEqual(typeof meta.name, 'string');
        assert.strictEqual(meta.name, pkg.name);
      });

      it('should have a `version` property', () => {
        assert.strictEqual(typeof meta.version, 'string');
        assert.strictEqual(meta.version, pkg.version);
      });
    });

    describe('parse', () => {
      it('should be a function', () => {
        assert.strictEqual(typeof parse, 'function');
      });

      it('should parse Markdown as CommonMark by default', () => {
        const ast = parse('~hi~');

        assert(ast.type === 'root');
        assert.strictEqual(ast.children.length, 1);

        const paragraph = ast.children[0];

        assert(paragraph.type === 'paragraph');
        assert.strictEqual(paragraph.children.length, 1);

        const text = paragraph.children[0];

        assert(text.type === 'text');
        assert.strictEqual(text.value, '~hi~');
      });
    });

    // TODO
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
    // TODO
  });

  describe('default export', () => {
    it('should have a `meta` property', () => {
      assert.strictEqual(typeof parser.meta, 'object');

      assert.strictEqual(typeof parser.meta.name, 'string');
      assert.strictEqual(parser.meta.name, pkg.name);

      assert.strictEqual(typeof parser.meta.version, 'string');
      assert.strictEqual(parser.meta.version, pkg.version);
    });

    it('should have a `parse` property', () => {
      assert.strictEqual(typeof parser.parse, 'function');
    });
  });
});
