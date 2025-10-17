<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows unused reference definitions in Markdown documents. Reference definitions provide a way to create reusable links or images, but when they're defined but never referenced, they add unnecessary clutter to your document.

The rule identifies definition entries (e.g., `[reference-id]: http://example.com`) that are not referenced by any link or image in the document and reports them as violations. Removing unused definitions helps keep your Markdown documents clean and maintainable.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

```md eslint-check
<!-- eslint mark/no-unused-definition: "error" -->

This paragraph has no references to any definitions.

[unused-link]: https://example.com
[another-unused]: https://example.com/another "With title"
```

```md eslint-check
<!-- eslint mark/no-unused-definition: "error" -->

This paragraph references [some-link][used-link] but not all definitions.

[used-link]: https://example.com
[unused-link]: https://example.com/unused
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

```md
This paragraph references [a link][used-link].

[used-link]: https://example.com
```

```md
This paragraph has an image ![Alt text][image-ref].

[image-ref]: https://example.com/image.png "Image title"
```

## When Not To Use It

You might want to disable this rule if:

- You're maintaining a document with intentionally defined but temporarily unused references
- You're using reference definitions as a form of documentation or note-taking
- You have a workflow that automatically generates reference definitions, some of which might not be used in every document
