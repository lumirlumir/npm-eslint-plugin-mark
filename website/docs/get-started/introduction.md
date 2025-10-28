# Introduction

As of October 3, 2024, [ESLint now officially supports linting Markdown](https://eslint.org/blog/2024/10/eslint-json-markdown-support/). The ESLint team stated that this is just the first step toward building a language-agnostic platform for source code linting.

This project aims to align with this trend by providing various rules to improve the quality of Markdown documents, with support for **CommonMark** and **GitHub Flavored Markdown (GFM)**.

Simply lint your Markdown files using the same tool you use for JavaScript, TypeScript, and other source code files.

## GOAL

Our goal is to provide a set of ESLint rules that help you write better Markdown documents and also provide a complete way to migrate from other famous existing Markdown linters like `markdownlint`, `remark-lint`, and `textlint`.

## Limitations

This plugin **does not include any formatting rules**. It only includes rules that check for common issues in Markdown files.

If you are looking for a tool that can format your Markdown files, you can use [Prettier](https://prettier.io/) or [markdownlint](https://github.com/DavidAnson/markdownlint).

Please note that we won't be adding any formatting rules to this plugin.
