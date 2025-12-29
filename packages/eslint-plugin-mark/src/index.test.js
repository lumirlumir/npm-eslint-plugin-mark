/**
 * @fileoverview Test for `index.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { defineConfig } from 'eslint/config';
import { Linter } from 'eslint/universal';
import { getFileName } from './core/tests/index.js';
import plugin from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  describe('Cascading style configuration should work correctly', async () => {
    it('`all` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([plugin.configs.all]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'mark/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`base` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        plugin.configs.base,
        { rules: { 'mark/no-double-space': 'error' } },
      ]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'mark/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`recommended` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([plugin.configs.recommended]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(cascadingStyleConfigResult.length, 1);
      strictEqual(cascadingStyleConfigResult[0].ruleId, 'mark/no-double-space');
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 1);
      strictEqual(cascadingStyleConfigResult[0].column, 3);
      strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`stylistic` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([plugin.configs.stylistic]);
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
        'mark/consistent-thematic-break-style',
      );
      strictEqual(cascadingStyleConfigResult[0].severity, 2);
      strictEqual(cascadingStyleConfigResult[0].line, 3);
      strictEqual(cascadingStyleConfigResult[0].column, 1);
      strictEqual(cascadingStyleConfigResult[0].endLine, 3);
      strictEqual(cascadingStyleConfigResult[0].endColumn, 4);
    });
  });

  describe('Extends style configuration should work correctly', async () => {
    it('`all` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            mark: plugin,
          },
          extends: ['mark/all'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(extendsStyleConfigResult[0].ruleId, 'mark/no-double-space');
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
            mark: plugin,
          },
          rules: {
            'mark/no-double-space': 'error',
          },
          extends: ['mark/base'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(extendsStyleConfigResult[0].ruleId, 'mark/no-double-space');
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
            mark: plugin,
          },
          extends: ['mark/recommended'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(extendsStyleConfigResult[0].ruleId, 'mark/no-double-space');
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
            mark: plugin,
          },
          extends: ['mark/stylistic'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('---\n\n___', extendsStyleConfig, {
        filename: 'test.md',
      });

      strictEqual(extendsStyleConfigResult.length, 1);
      strictEqual(
        extendsStyleConfigResult[0].ruleId,
        'mark/consistent-thematic-break-style',
      );
      strictEqual(extendsStyleConfigResult[0].severity, 2);
      strictEqual(extendsStyleConfigResult[0].line, 3);
      strictEqual(extendsStyleConfigResult[0].column, 1);
      strictEqual(extendsStyleConfigResult[0].endLine, 3);
      strictEqual(extendsStyleConfigResult[0].endColumn, 4);
    });
  });
});
