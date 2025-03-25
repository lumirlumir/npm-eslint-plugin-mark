# `{{ $frontmatter.title }}`

<!-- markdownlint-disable-next-line no-inline-html -->
<div v-html="$frontmatter.rule"></div>

## Rule Details

Markdown treats double or multiple consecutive spaces within a sentence as a single space.

Double spaces within a sentence are usually typos and can be hard to spot. This rule helps keep your code clean and consistent.

It only checks for **double or multiple consecutive** spaces ***within sentences***. Since **leading** and **trailing** spaces have special meanings in Markdown, this rule does not check for them. **Leading** spaces are used for creating code blocks or indentation, while **trailing** spaces are used to create line breaks.

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

::: code-group

```md [incorrect.md]
<!-- [!code word:  :1] -->
foo  bar  baz
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

#### With `multipleSpaces: true` Option

::: code-group

```md [incorrect.md]
<!-- [!code word:  :1] -->
foo  bar  baz

<!-- [!code word:   :1] -->
foo   bar   baz

<!-- [!code word:    :1] -->
foo    bar    baz    qux
```

```js [eslint.config.mjs] {5-7}
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': ['error', { // [!code focus]
        multipleSpaces: true, // [!code focus]
      }], // [!code focus]
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
foo bar baz qux

foo   bar    baz     qux

  foo bar

foo bar  ⁡

foo bar    ⁡
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

#### With `multipleSpaces: true` Option

::: code-group

```md [correct.md]
foo bar baz qux

  foo bar

foo bar  ⁡

foo bar    ⁡
```

```js [eslint.config.mjs] {5-7}
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': ['error', { // [!code focus]
        multipleSpaces: true, // [!code focus]
      }], // [!code focus]
    },
  },
  // ...
];
```

:::

## Options

```js
'mark/no-double-spaces': ['error', {
  multipleSpaces: false,
}]
```

### `multipleSpaces`

> Default: `false`

When `multipleSpaces` is set to `true`, this rule will also check for multiple consecutive spaces (more than two) within a sentence.

## Fix

This rule fixes the double or multiple consecutive spaces by replacing them with a single space.

## AST

This rule applies only to the [`Text`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#text) node.

## Prior Art

- [textlint-rule-doubled-spaces](https://github.com/iwamatsu0430/textlint-rule-doubled-spaces)
