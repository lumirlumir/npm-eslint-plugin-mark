# `{{ $frontmatter.title }}`

<!-- markdownlint-disable-next-line no-inline-html -->
<div v-html="$frontmatter.rule"></div>

## Rule Details

Markdown treats double or multiple consecutive spaces within a sentence as a single space.

Double spaces within a sentence are usually typos and can be hard to spot. This rule helps keep your code clean and consistent.

Please note that this rule only checks for **double or multiple consecutive** spaces ***within sentences***. Since **leading** and **trailing** spaces have special meanings in Markdown, this rule does not check for them. **Leading** spaces are used for creating code blocks or indentation, while **trailing** spaces are used to create line breaks.

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

::: code-group

```md [incorrect.md]
foo  bar

foo  bar  baz
```

```js [eslint.config.mjs]
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': 'error',
    },
  },
  // ...
];
```

:::

#### With `multipleSpaces` Option

::: code-group

```md [incorrect.md]
foo   bar

foo  bar   baz    qux
```

```js [eslint.config.mjs]
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': ['error', {
        multipleSpaces: true,
      }],
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
<!-- single spaces -->
foo bar baz qux

<!-- multiple (more than three) spaces -->
foo   bar     baz

<!-- leading double space -->
  foo bar

<!-- trailing double space -->
foo bar␣␣
```

```js [eslint.config.mjs]
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': 'error',
    },
  },
  // ...
];
```

:::

#### With `multipleSpaces` Option

::: code-group

```md [correct.md]
<!-- Single spaces -->
foo bar baz qux

<!-- leading double space -->
  foo bar

<!-- leading multiple space -->
    foo bar

<!-- trailing double space -->
foo bar␣␣

<!-- trailing multiple space -->
foo bar␣␣␣
```

```js [eslint.config.mjs]
export default [
  // ...
  {
    rules: {
      'mark/no-double-spaces': ['error', {
        multipleSpaces: true,
      }],
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
