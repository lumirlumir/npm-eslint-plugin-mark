/**
 * @fileoverview Test for `index.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { ok, strictEqual } from 'node:assert';

import { defineConfig } from 'eslint/config';
import { Linter } from 'eslint/universal';
import markdown from '@eslint/markdown';

import { getFileName } from './core/tests/index.js';
import md from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  describe('Basic', () => {
    it('should have correct meta information', () => {
      strictEqual(md.meta.name, 'eslint-markdown');
      strictEqual(typeof md.meta.version, 'string');
    });

    it('should have rules', () => {
      ok(md.rules);
      strictEqual(typeof md.rules, 'object');
      strictEqual(Object.keys(md.rules).length > 0, true);
    });

    it('should have configs', () => {
      ok(md.configs);
      ok(md.configs.all);
      ok(md.configs.base);
      ok(md.configs.recommended);
      ok(md.configs.stylistic);
      strictEqual(typeof md.configs, 'object');
      strictEqual(Object.keys(md.configs).length > 0, true);
    });
  });

  describe('Extends style configuration should work correctly', () => {
    it('`all` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/all'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(extendsStyleConfigResult[0].severity, 2);
      strictEqual(extendsStyleConfigResult[0].line, 1);
      strictEqual(extendsStyleConfigResult[0].column, 3);
      strictEqual(extendsStyleConfigResult[0].endLine, 1);
      strictEqual(extendsStyleConfigResult[0].endColumn, 5);
    });

    it('`base` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          rules: {
            'md/no-double-space': 'error',
          },
          extends: ['md/base'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(extendsStyleConfigResult[0].severity, 2);
      strictEqual(extendsStyleConfigResult[0].line, 1);
      strictEqual(extendsStyleConfigResult[0].column, 3);
      strictEqual(extendsStyleConfigResult[0].endLine, 1);
      strictEqual(extendsStyleConfigResult[0].endColumn, 5);
    });

    it('`recommended` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/recommended'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(extendsStyleConfigResult[0].severity, 2);
      strictEqual(extendsStyleConfigResult[0].line, 1);
      strictEqual(extendsStyleConfigResult[0].column, 3);
      strictEqual(extendsStyleConfigResult[0].endLine, 1);
      strictEqual(extendsStyleConfigResult[0].endColumn, 5);
    });

    it('`stylistic` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/stylistic'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('---\n\n___', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(
        extendsStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      strictEqual(extendsStyleConfigResult[0].severity, 2);
      strictEqual(extendsStyleConfigResult[0].line, 3);
      strictEqual(extendsStyleConfigResult[0].column, 1);
      strictEqual(extendsStyleConfigResult[0].endLine, 3);
      strictEqual(extendsStyleConfigResult[0].endColumn, 4);
    });
  });

  describe('Cascading style configuration should work correctly', () => {
    it('`all` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([md.configs.all]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`all` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.all,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      strictEqual(cascadingStyleConfigResult.length, 2);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      strictEqual(cascadingStyleConfigResult[1].ruleId, 'markdown/no-unused-definitions');
      strictEqual(cascadingStyleConfigResult[1].severity, 2);
      strictEqual(cascadingStyleConfigResult[1].line, 3);
      strictEqual(cascadingStyleConfigResult[1].column, 1);
      strictEqual(cascadingStyleConfigResult[1].endLine, 3);
      strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('`base` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        md.configs.base,
        { rules: { 'md/no-double-space': 'error' } },
      ]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`base` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.base,
        { rules: { 'md/no-double-space': 'error' } },
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      strictEqual(cascadingStyleConfigResult.length, 2);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      strictEqual(cascadingStyleConfigResult[1].ruleId, 'markdown/no-unused-definitions');
      strictEqual(cascadingStyleConfigResult[1].severity, 2);
      strictEqual(cascadingStyleConfigResult[1].line, 3);
      strictEqual(cascadingStyleConfigResult[1].column, 1);
      strictEqual(cascadingStyleConfigResult[1].endLine, 3);
      strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('`recommended` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([md.configs.recommended]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`recommended` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.recommended,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      strictEqual(cascadingStyleConfigResult.length, 2);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      strictEqual(cascadingStyleConfigResult[1].ruleId, 'markdown/no-unused-definitions');
      strictEqual(cascadingStyleConfigResult[1].severity, 2);
      strictEqual(cascadingStyleConfigResult[1].line, 3);
      strictEqual(cascadingStyleConfigResult[1].column, 1);
      strictEqual(cascadingStyleConfigResult[1].endLine, 3);
      strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('`stylistic` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([md.configs.stylistic]);
      const cascadingStyleConfigResult = linter.verify(
        '---\n\n___',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(
        cascadingStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 3);
      strictEqual(cascadingStyleConfigResult[0].column, 1);
      strictEqual(cascadingStyleConfigResult[0].endLine, 3);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 4);
    });

    it('`stylistic` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.stylistic,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '---\n\n___\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      strictEqual(cascadingStyleConfigResult.length, 2);
      strictEqual(
        cascadingStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 3);
      strictEqual(cascadingStyleConfigResult[0].column, 1);
      strictEqual(cascadingStyleConfigResult[0].endLine, 3);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 4);
      strictEqual(cascadingStyleConfigResult[1].ruleId, 'markdown/no-unused-definitions');
      strictEqual(cascadingStyleConfigResult[1].severity, 2);
      strictEqual(cascadingStyleConfigResult[1].line, 5);
      strictEqual(cascadingStyleConfigResult[1].column, 1);
      strictEqual(cascadingStyleConfigResult[1].endLine, 5);
      strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });
  });
});
