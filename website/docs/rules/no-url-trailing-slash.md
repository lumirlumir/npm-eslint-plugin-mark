<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows trailing slashes in URLs within Markdown documents. Trailing slashes in URLs can lead to inconsistencies and potential issues with link resolution, SEO, and web server configurations.

Many web servers and content management systems treat URLs with and without trailing slashes as different resources, which can cause:

- Duplicate content issues for SEO
- Broken links when URLs are inconsistently referenced
- Confusion about which URL variant is canonical

By enforcing consistent URL formatting without trailing slashes, this rule helps maintain clean and predictable link structures in your documentation.

> [!NOTE]
>
> This rule intelligently handles URLs by removing query parameters (`?query=string`) and fragments (`#fragment`) before checking for trailing slashes. This means `https://example.com/?query=string` will be flagged because the pathname ends with a trailing slash, but `https://example.com?query=string` will not be flagged.

The rule examines all URL-bearing elements in a Markdown document:

- Standard Markdown link syntax: `[text](url "title")` or `<https://example.com>`
- Markdown images: `![alt text](url "title")`
- Link reference definitions: `[ref]: url "title"`
- HTML link tags: `<a href="url">text</a>`
- HTML image tags: `<img src="url" />`

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

```md eslint-check
<!-- eslint mark/no-url-trailing-slash: 'error' -->

[Link](https://example.com/)

[Link](https://example.com/path/to/resource/)

[Link](https://example.com/?query=string)

[Link](https://example.com/#fragment)

<https://example.com/>

![Image](https://example.com/)

[reference]: https://example.com/

<a href="https://example.com/">Link</a>

<img src="https://example.com/" />
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

```md eslint-check
<!-- eslint mark/no-url-trailing-slash: 'error' -->

[Link](https://example.com)

[Link](https://example.com/path/to/resource)

[Link](https://example.com?query=string)

[Link](https://example.com#fragment)

[Link](https://example.com/path/to/resource?query=string#fragment)

<https://example.com>

![Image](https://example.com)

[reference]: https://example.com

<a href="https://example.com">Link</a>

<img src="https://example.com" />
```

## Options

No options are available for this rule.

## Prior Art

- [`remark-lint-no-url-trailing-slash`](https://github.com/vhf/remark-lint-no-url-trailing-slash)
- [`markdownlint-rule-no-trailing-slash-in-links`](https://github.com/xiaogaozi/markdownlint-rule-no-trailing-slash-in-links)
