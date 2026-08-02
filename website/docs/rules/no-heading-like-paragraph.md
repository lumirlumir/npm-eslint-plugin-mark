<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

An ATX heading opens with one to six `#` characters, so `####### Installation` is not a heading at all. Markdown renders it as a paragraph whose text starts with seven literal `#` characters. That is almost always a typo, and it slips past review because the source still reads like a heading.

This rule reports a paragraph that begins with seven or more `#` characters followed by a space, a tab, a line ending, or the end of the paragraph.

Anything that cannot open an ATX heading stays untouched. `#######Installation` has no whitespace to delimit the `#` characters. `\####### Installation` and `&#35;###### Installation` escape their leading `#` character on purpose.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-heading-like-paragraph: 'error' -->

####### Installation

######## Configuration

> ####### Usage

- ####### Options
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-heading-like-paragraph: 'error' -->

###### Installation

> ###### Usage

- ###### Options

#######Configuration

\####### Not a heading

Seven ####### characters in the middle of a paragraph.
```

## Options

No options are available for this rule.

## Suggestion

This rule provides two suggestions.

The first replaces the `#` characters with `######`, which turns the paragraph into a level 6 heading. `####### Installation` becomes `###### Installation`.

The second escapes the leading `#` character, so the paragraph keeps rendering the way it does now. `####### Installation` becomes `\####### Installation`.

This rule provides no automatic fix. Seven or more `#` characters tell you the author made a mistake, but not which of the two corrections they meant.

## Limitations

This rule only checks the beginning of a paragraph, so it ignores `#` characters on a continuation line:

```md
Install the package first.
####### Installation
```

`####### Installation` cannot start a heading, so Markdown folds it into the preceding paragraph as a lazy continuation line. The same text with six or fewer `#` characters would interrupt the paragraph and become a real heading.

## Further Reading

- [CommonMark Spec: ATX Headings](https://spec.commonmark.org/0.31.2/#atx-headings)

## Prior Art

- [`remark-lint-no-heading-like-paragraph`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-like-paragraph#remark-lint-no-heading-like-paragraph)
