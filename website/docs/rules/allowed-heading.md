<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces that heading text content matches predefined allowed values. It allows you to restrict the text of headings at different levels (`h1`-`h6`) to specific sets of allowed strings, ensuring consistency in document structure and terminology across your Markdown files.

The rule examines each heading in the document, extracts its text content, and checks if it appears in the configured allowed list for that heading level. If the heading text is not in the allowed list, the rule reports an error.

This is particularly useful for:

- Enforcing standardized section names in documentation
- Ensuring consistent document structure across a project
- Maintaining uniform terminology in collaborative writing environments
- Creating templates where specific headings must follow a predefined pattern

## Options

```js
'mark/allowed-heading': ['error', {
  h1: false,
  h2: false,
  h3: false,
  h4: false, 
  h5: false,    
  h6: false,
}]
```

Each heading level can be configured with:

- An array of strings: Only these exact strings are allowed for that heading level
- `false`: No restrictions for that heading level (any text is allowed)
- An empty array `[]`: No headings at that level are allowed (all headings at that level will be reported)

## When Not To Use It

You should disable this rule if:

- You want to maintain flexibility in your document headings
- Your documents have dynamic or generated content in headings
- You're writing exploratory or draft content where enforcing heading structure would be too restrictive
- You have different heading requirements for different types of documents

## AST

This rule applies to [`Heading`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#heading) nodes in the Markdown AST. It extracts the text content after the heading markers (e.g., `##`) and compares it against the allowed values.
