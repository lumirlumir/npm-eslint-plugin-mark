<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Some Markdown parsers or plugins, like [`@mdit/plugin-attrs`](https://mdit-plugins.github.io/attrs.html), support custom heading IDs which can be used to add IDs to headings.

Heading IDs are helpful for linking to specific sections within a document and are supported by some websites and markdown parsers through the `{#id}` syntax. These IDs not only provide improved accessibility, allowing screen readers to create a navigable table of contents, but also enhance SEO by helping search engines understand the structure of the document and deliver better search results.

When building websites with internationalization in mind, it's recommended to use English words for heading IDs. This is because certain languages may cause issues with URL encoding, leading to characters like `%20` or `%C3%A9` when IDs are encoded, which can make it difficult for people to recognize.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

::: code-group

```md [incorrect.md] / ⁡/
# Heading 1 ⁡

## Heading 2 ⁡

### Heading 3 ⁡

#### Heading 4 ⁡

##### Heading 5 ⁡

###### Heading 6 ⁡

# Heading {#} ⁡

# Heading { #id} ⁡
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/heading-id': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

::: code-group

```md [correct.md]
# Heading 1 {#heading-1}

## Heading 2 {#heading-2}

### Heading 3 {#heading-3}

#### Heading 4 {#heading-4}

##### Heading 5 {#heading-5}

###### Heading 6 {#heading-6}
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/heading-id': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

## Options

```js
'mark/heading-id': [
  'error',
  'always',
  {
    leftDelimiter: '{',
    rightDelimiter: '}',
    ignoreDepth: [],
  }
]
```

### First Option

#### `'always'` | `'never'`

> Default: `'always'`

`'always'` enforces the presence of heading IDs. `'never'` disallows heading IDs.

### Second Option

#### `leftDelimiter`

> Default: `'{'`

::: warning

Please note that if you use a custom delimiter, it must be escaped since it is used in a regular expression. For example, if you want to use `'['`, you should pass `'\\['` to the option.

:::

The left delimiter to use for heading IDs.

#### `rightDelimiter`

> Default: `'}'`

::: warning

Please note that if you use a custom delimiter, it must be escaped since it is used in a regular expression. For example, if you want to use `']'`, you should pass `'\\]'` to the option.

:::

The right delimiter to use for heading IDs.

#### `ignoreDepth`

> Default: `[]`

An array of heading depths to ignore. For example, `[1, 2]` would ignore the first and second level headings.

## AST

This rule applies only to the [`Heading`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#heading) node.  

## Prior Art

- [textlint-rule-require-header-id](https://github.com/textlint-rule/textlint-rule-require-header-id)
