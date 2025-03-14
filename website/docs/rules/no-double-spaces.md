# `no-double-spaces`

<kbd>Recommended ✅</kbd> <kbd>Fixable 🛠️</kbd>

Disallow double spaces in text, except for leading and trailing spaces

## Rule Details

Markdown treats double or more spaces as a single space. Double spaces in Markdown sentences are usually typos or mistakes and can be hard to spot. This rule will help keep your code clean and consistent.

This rule only checks for **double** spaces ***in the middle of sentences*** and applies only to [`text`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#text) node.

Since **leading** and **trailing** spaces have special meaning in markdown, this rule will not check for them. **Leading** spaces are used for creating code blocks or indentation, and **trailing** spaces are used to create line breaks.

### ❌ Incorrect

Examples of **incorrect** code for this rule:

```md
foo  bar
```

### ✅ Correct

Examples of **correct** code for this rule:

```md
<!-- Single spaces -->
foo bar baz qux

<!-- multiple (more than three) spaces -->
foo   bar     baz

<!-- leading double space -->
  foo bar

<!-- trailing double space -->
foo bar␣␣
```

## Fix

This rule fixes the double spaces by replacing them with a single space.

## Options

No options are provided.

## Prior Art

- [textlint-rule-doubled-spaces](https://github.com/iwamatsu0430/textlint-rule-doubled-spaces)
