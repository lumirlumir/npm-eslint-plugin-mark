<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Some websites and Markdown parsers handle emojis natively or provide their own plugins for support. Instead of using raw emojis like `😃`, you can use the `:smiley:`-style syntax, which places colons around the emoji name.

The purpose of this rule is to discourage the use of raw emojis in Markdown files and encourage the use of the `:smiley:`-style syntax for better compatibility.

For a full list of supported emojis, you can refer to the [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) or [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet).

Platforms like [GitHub](https://github.com) and Markdown plugins such as [`remark-emoji`](https://github.com/rhysd/remark-emoji) and [`markdown-it-emoji`](https://github.com/markdown-it/markdown-it-emoji) also support this feature.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

::: code-group

```md [incorrect.md] /😃/ /🦄/ /👍/
Smiley 😃

Unicorn 🦄

+1 👍
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/no-emoji': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

::: code-group

```md [correct.md]
Smiley :smiley:

Unicorn :unicorn:

+1 :+1:
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/no-emoji': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

## Limitations

This rule uses [Emoji Regex](https://github.com/mathiasbynens/emoji-regex) internally to match emojis. Emojis that are not supported by this regex will not be detected by this rule.

## Options

No options are available for this rule.

## AST

This rule applies only to the [`Text`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#text) node.
