<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

case insensitive

## Options

```js
'mark/code-lang-shorthand': ['error', {
  ignores: [],
  override: {},
}]
```

### `ignores`

> Default: `[]`

An array of code block language identifiers to ignore. Each value should be a lowercase, unabridged language identifier.

For example, to ignore the `javascript` and `typescript` language identifiers:

```js
'mark/code-lang-shorthand': ['error', {
  ignores: ['javascript', 'typescript'],
}]
```

### `override`

> Default: `{}`

An object where the key is the unabridged language identifier and the value is the abbreviated form.

#### Adding a new abbreviation

For example, to shorten the `example` language identifier to `ex`:

```js
'mark/code-lang-shorthand': ['error', {
  override: {
    example: 'ex',
  },
}]
```

#### Overriding an existing abbreviation

For example, to change the default abbreviation for `javascript` to `mjs`:

```js
'mark/code-lang-shorthand': ['error', {
  override: {
    javascript: 'mjs',
  },
}]
```

## Fix

This rule converts unabridged code block language identifiers into their abbreviated forms.

## AST

This rule applies only to the [`Code`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#code) node.
