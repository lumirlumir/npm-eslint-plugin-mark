<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

The purpose of this rule is to allow the use of ASCII characters in the editor and optionally convert them to curly symbols during rendering, using a parser that supports this feature, such as the Typographer extension of [Goldmark](https://github.com/yuin/goldmark) or [SmartyPants](https://daringfireball.net/projects/smartypants/).

In addition, curly quotes (`“` `\u201C`, `”` `\u201D`, `‘` `\u2018` or `’` `\u2019`), which are often introduced by word processors like Word, Google Docs, and Pages, can cause unwanted issues in code and markup. Especially in non-monospaced fonts, it can be difficult to distinguish curly quotes from straight ones, leading to potential errors.

By applying this rule, you can prevent unintended curly quotes and keep your code clean and consistent.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

::: code-group

```md [incorrect.md] /“/ /”/ /‘/ /’/
“foo bar”

‘foo bar’

“foo ‘bar baz’ qux”
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/no-curly-quote': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

::: code-group

```md [correct.md]
"foo bar"

'foo bar'

"foo 'bar baz' qux"
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/no-curly-quote': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

## Options

```js
'mark/no-curly-quote': ['error', {
  leftDoubleQuotationMark: true,
  rightDoubleQuotationMark: true,
  leftSingleQuotationMark: true,
  rightSingleQuotationMark: true,
}]
```

### `leftDoubleQuotationMark`

> Default: `true`

When `leftDoubleQuotationMark` is set to `false`, this rule will not check for the left double quotation mark (`“`).

### `rightDoubleQuotationMark`

> Default: `true`

When `rightDoubleQuotationMark` is set to `false`, this rule will not check for the right double quotation mark (`”`).

### `leftSingleQuotationMark`

> Default: `true`

When `leftSingleQuotationMark` is set to `false`, this rule will not check for the left single quotation mark (`‘`).

### `rightSingleQuotationMark`

> Default: `true`

When `rightSingleQuotationMark` is set to `false`, this rule will not check for the right single quotation mark (`’`).

## Fix

This rule fixes the curly quotes by replacing them with straight quotes.

## AST

This rule applies only to the [`Text`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#text) node.

## Prior Art

- [textlint-rule-no-curly-quotes](https://github.com/aborazmeh/textlint-rule-no-curly-quotes)
