# Migration Guide

This chapter provides guidance for migrating to [`@eslint/markdown`](https://github.com/eslint/markdown) and [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-plugin-mark) from other Markdown linting tools like [`markdownlint`](https://github.com/DavidAnson/markdownlint), [`remark-lint`](https://github.com/remarkjs/remark-lint#readme), and [`textlint`](https://github.com/textlint/textlint#readme).

## Migrating from [`@eslint/markdown`](https://github.com/eslint/markdown#readme)

This plugin does not include any rules that overlap with ESLint's built-in Markdown rules provided by `@eslint/markdown`. As a result, `eslint-markdown` is completely disjoint from `@eslint/markdown`, and no migration is needed.

If the upstream `@eslint/markdown` project adopts any rules from this plugin, we will deprecate and remove the overlapping rules in this plugin.

You can use both `@eslint/markdown` and `eslint-markdown` together to get full support and additional features when migrating your Markdown linting setup, which is covered in the following section.

## Migrating from [`markdownlint`](https://github.com/DavidAnson/markdownlint#readme)

If you are a user of [`markdownlint`](https://github.com/DavidAnson/markdownlint), [`markdownlint-cli`](https://github.com/igorshubovych/markdownlint-cli), or [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2)

TODO

## Migrating from [`remark-lint`](https://github.com/remarkjs/remark-lint#readme)

TODO

## Migrating from [`textlint`](https://github.com/textlint/textlint#readme)

TODO
