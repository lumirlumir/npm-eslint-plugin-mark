<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of title attributes for all images in Markdown documents. Having title attributes on images provides additional context and can improve accessibility by offering supplementary information when hovering over an image.

The rule examines all image elements in a Markdown document and reports any images that lack a title attribute. It checks:

- Standard Markdown image syntax: `![alt text](url "title")`
- Image reference definitions: `[ref]: url "title"`
- HTML image tags: `<img src="url" alt="alt text" title="title">`

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

```md
![Alt text](https://example.com/image.png)

<img src="https://example.com/image.png" alt="Alt text">

![Alt text][reference]

[reference]: https://example.com/image.png
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

```md
![Alt text](https://example.com/image.png "Image title")

<img src="https://example.com/image.png" alt="Alt text" title="Image title">

![Alt text][reference]

[reference]: https://example.com/image.png "Image title"
```

## When Not To Use It

You might want to disable this rule if:

- Your documentation style guide doesn't require image titles
- You're working with legacy documentation where adding titles to all images would be impractical
- You're using a documentation system that provides alternative methods for image descriptions or captions

## Options

No options are available for this rule.

## AST

This rule examines the following AST node types:

- [`Image`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#image) nodes for standard Markdown image syntax
- [`Html`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#html) nodes to check for `<img>` tags
- [`ImageReference`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#imagereference) and [`Definition`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#definition) nodes for referenced images
