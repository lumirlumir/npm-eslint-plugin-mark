<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule is triggered when an image is missing alternative text (alt text)
information.

Alternative text is important for **accessibility** and describes the
content of an image for people who may not be able to see it.

Guidance for writing alternative text is available from the [W3C](https://www.w3.org/WAI/alt/),
[Wikipedia](https://en.wikipedia.org/wiki/Alt_attribute), and [other locations](https://www.phase2technology.com/blog/no-more-excuses).

Alternative text is commonly specified inline as:

```md
![alternative text](https://example.com/image.jpg)
```

Or with reference syntax as:

```md
![alternative text][ref]

[ref]: https://example.com/image.jpg "Optional title"
```

Or with HTML as:

```html
<img src="https://example.com/image.jpg" alt="alternative text" />
```

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

::: code-group

```md [incorrect.md]
![](https://example.com/image.jpg)

![][image]

[image]: https://example.com/image.jpg

<img src="https://example.com/image.jpg" />

<img src="https://example.com/image.jpg" alt="" />
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/alt-text': 'error', // [!code focus]
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
![alternative text](https://example.com/image.jpg)

![alternative text][image]

[image]: https://example.com/image.jpg

<img src="https://example.com/image.jpg" alt="alternative text" />
```

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/alt-text': 'error', // [!code focus]
    },
  },
  // ...
];
```

## Options

No options are available for this rule.

## AST

This rule applies to the [`Image`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#image), [`ImageReference`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#imagereference), and [`Html`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#html) nodes.

## Prior Art

- [markdownlint: MD045](https://github.com/DavidAnson/markdownlint/blob/main/doc/md045.md)
