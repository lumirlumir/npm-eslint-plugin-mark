<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces that heading text content matches predefined allowed values. It allows you to restrict the text of headings at different levels (`h1`-`h6`) to specific sets of allowed strings, ensuring consistency in document structure and terminology across your Markdown files.

The rule examines each heading in the document, extracts its text content, and checks if it appears in the configured allowed list for that heading level. If the heading text is not in the allowed list, the rule reports an error.

This is particularly useful for:

- Enforcing standardized section names in documentation.
- Ensuring consistent document structure across a project.
- Maintaining uniform terminology in collaborative writing environments.
- Creating templates where specific headings must follow a predefined pattern.

::: info

This rule doesn't report any errors by default. You must configure it with the allowed heading values you want to enforce.

:::

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### With `{ h1: ["Introduction"], h2: ["Overview", "Installation"] }` Option

```md [incorrect.md] eslint-check
<!-- eslint mark/allow-heading: ["error", { h1: ["Introduction"], h2: ["Overview", "Installation"] }] -->

# Introduction

# Invalid Heading

## Overview

## Installation

## Features

### Feature 1
```

#### With `{ h3: [] }` Option

If you want to disallow all `h3` headings, you can set the `h3` option to an empty array. This will report any `h3` heading as an error.

```md [incorrect.md] eslint-check
<!-- eslint mark/allow-heading: ["error", { h3: [] }] -->

# Introduction

## Overview

## Installation

## Features

### Feature 1

### Feature 2

### Feature 3
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

This rule doesn't report any errors by default. You must configure it with the allowed heading values you want to enforce.

```md [correct.md] eslint-check
<!-- eslint mark/allow-heading: "error" -->

# Introduction

## Overview

## Installation
```

#### With `{ h1: ["Introduction"], h2: ["Overview", "Installation"] }` Option

```md [correct.md] eslint-check
<!-- eslint mark/allow-heading: ["error", { h1: ["Introduction"], h2: ["Overview", "Installation"] }] -->

# Introduction

## Overview

## Installation
```

#### With `{ h1: false, h2: false, h3: false, h4: false, h5: false, h6: false }` Option

If you want to allow any text for all headings, you can set each heading level to `false`. This will not restrict any headings.

```md [correct.md] eslint-check
<!-- eslint mark/allow-heading: ["error", { h1: false, h2: false, h3: false, h4: false, h5: false, h6: false }] -->

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading
```

## Options

```js
'mark/allow-heading': ['error', {
  h1: false,
  h2: false,
  h3: false,
  h4: false, 
  h5: false,    
  h6: false,
}]
```

Each heading level can be configured with:

- `false`: No restrictions for that heading level (any text is allowed).
- An array of strings: Only these exact strings are allowed for that heading level.
- An empty array `[]`: No headings at that level are allowed (all headings at that level will be reported).

### `h1`

> Default: `false`

The allowed values for `h1` headings. This can be set to an array of strings to restrict `h1` headings to specific values. If set to an empty array, no `h1` headings are allowed.

### `h2`

> Default: `false`

The allowed values for `h2` headings. This can be set to an array of strings to restrict `h2` headings to specific values. If set to an empty array, no `h2` headings are allowed.

### `h3`

> Default: `false`

The allowed values for `h3` headings. This can be set to an array of strings to restrict `h3` headings to specific values. If set to an empty array, no `h3` headings are allowed.

### `h4`

> Default: `false`

The allowed values for `h4` headings. This can be set to an array of strings to restrict `h4` headings to specific values. If set to an empty array, no `h4` headings are allowed.

### `h5`

> Default: `false`

The allowed values for `h5` headings. This can be set to an array of strings to restrict `h5` headings to specific values. If set to an empty array, no `h5` headings are allowed.

### `h6`

> Default: `false`

The allowed values for `h6` headings. This can be set to an array of strings to restrict `h6` headings to specific values. If set to an empty array, no `h6` headings are allowed.

## When Not To Use It

You should disable this rule if:

- You want to maintain flexibility in your document headings.
- Your documents have dynamic or generated content in headings.
- You're writing exploratory or draft content where enforcing heading structure would be too restrictive.
- You have different heading requirements for different types of documents.

## AST

This rule applies to [`Heading`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#heading) nodes in the Markdown AST. It extracts the text content after the heading markers (e.g., `##`) and compares it against the allowed values.
