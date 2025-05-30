<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Git conflict markers are special text sequences that Git inserts into files when it can't automatically resolve conflicts during a merge operation. These markers include:

  ```txt
  <<<<<<<
  =======
  >>>>>>>
  ```

While other programming languages would typically throw syntax errors when conflict markers are present, Markdown parsers silently treat these markers as part of the text content. This leads to several problems:

1. **Unintended rendering**: Conflict markers will be rendered visibly in the final output, creating confusion for readers.
1. **Broken formatting**: Conflict markers can break the structure of Markdown documents and cause unexpected rendering outcomes.
1. **Inconsistent content**: Documents with conflict markers contain both versions of the conflicted section, which is rarely the intended outcome.

This rule identifies and reports any Git conflict markers in your Markdown files to ensure they are resolved before the content is published or shared.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

  ```md /<<<<<<</ /=======/ />>>>>>>/
  <!-- eslint mark/no-git-conflict-marker: "error" -->

  # My Document

  <<<<<<< HEAD
  This is my version of the content.
  =======
  This is someone else's version of the content.
  >>>>>>> branch-name

  ## Next Section
  ```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

  ```md
  <!-- eslint mark/no-git-conflict-marker: "error" -->

  # My Document

  This is the resolved content.

  ## Next Section
  ```

## Options

```js
'mark/no-git-conflict-marker': ['error', {
  skipCode: true
}]
```

### `skipCode`

> Default: `true`

`true` allows any Git conflict markers in code blocks.

## AST

This rule applies to the entire document, specifically to the [`Root`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#root) node.
