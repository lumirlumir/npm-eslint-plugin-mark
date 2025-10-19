<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Invalid or irregular whitespace can cause issues with Markdown renderers and also makes Markdown documents harder to debug in a similar nature to mixed tabs and spaces.

Various whitespace characters can be inputted by writers by mistake, for example from copying or keyboard shortcuts. Pressing Alt + Space on macOS adds in a non-breaking space character, for example. Additionally, AI-generated Markdown documents often include irregular whitespace characters.

A simple fix for this problem could be to rewrite the offending line from scratch. This might also be a problem introduced by the text editor: if rewriting the line does not fix it, try using a different editor.

In Markdown, irregular whitespace may cause:

- Headings not to be recognized (e.g., a non-breaking space between `#` and the heading text).
- Lists or task lists to fail to parse due to non-standard spaces before `-`, `*`, `+`, or digits.
- Code fences or indented code blocks to break because indentation uses irregular spaces instead of normal spaces or tabs.
- Links and images to break when zero-width or non-breaking spaces are embedded in URLs or reference labels.
- Table alignment to render incorrectly when pipes `|` are surrounded by irregular whitespace.
- Front matter delimiters (`---`) or HTML blocks to be misparsed if invisible characters are mixed into delimiter lines.

Known issues these spaces cause in Markdown:

- Ogham Space Mark (U+1680)
  - Renders as a visible glyph in most fonts, producing unexpected symbols in rendered Markdown.
  - May prevent syntax that requires a normal space from being recognized (e.g., the space after `#` in headings, before list markers, or around table pipes).

- Mongolian Vowel Separator (U+180E)
  - No longer treated as a whitespace separator since Unicode 6.3; most Markdown parsers will not treat it as a space.
  - Can break headings, lists, links, and tables when used where a normal space is required, and may cause parsing errors.

- Line Separator (U+2028) and Paragraph Separator (U+2029)
  - Many Markdown parsers expect line endings to be `\r\n`, `\r`, or `\n`. These characters may not be recognized as line breaks, leading to merged paragraphs, broken lists, or code fences not closing.

- Zero Width Space (U+200B)
  - Invisible in most editors and renderers, making it hard to locate.
  - Not treated as a normal space in Markdown syntax; can cause headings not to parse, autolinks or reference labels to fail, and table cell alignment to break when inserted inadvertently.

This rule aims to catch invalid whitespace other than normal tabs and spaces, and disallows the following characters except where permitted by the options:

```txt
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u0085 - Next Line - <NEL>
\u00A0 - No-Break Space - <NBSP>
\u1680 - Ogham Space Mark - <OGSP>
\u180E - Mongolian Vowel Separator - <MVS>
\u2000 - En Quad - <NQSP>
\u2001 - Em Quad - <MQSP>
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>
\u2007 - Figure Space - <FSP>
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space - <THSP>
\u200A - Hair Space - <HSP>
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator - <LS> - <LSEP>
\u2029 - Paragraph Separator - <PS> - <PSEP>
\u202F - Narrow No-Break Space - <NNBSP>
\u205F - Medium Mathematical Space - <MMSP>
\u3000 - Ideographic Space - <IDSP>
\uFEFF - Zero Width No-Break Space - <BOM>
```

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint mark/no-irregular-whitespace: "error" -->

\u000B - Line Tabulation (\v) - <VT>  <= Here
\u0085 - Next Line - <NEL>  <= Here
\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
\u2001 - Em Quad - <MQSP>   <= Here
\u2002 - En Space - <ENSP>   <= Here
\u2003 - Em Space - <EMSP>   <= Here
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>  <= Here
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>   <= Here
\u2007 - Figure Space - <FSP>   <= Here
\u2008 - Punctuation Space - <PUNCSP>   <= Here
\u2009 - Thin Space - <THSP>   <= Here
\u200A - Hair Space - <HSP>   <= Here
\u2028 - Line Separator - <LS> - <LSEP>   <= Here
\u2029 - Paragraph Separator - <PS> - <PSEP>   <= Here
\u202F - Narrow No-Break Space - <NNBSP>   <= Here
\u205F - Medium Mathematical Space - <MMSP>   <= Here
\u3000 - Ideographic Space - <IDSP>　 <= Here
```

#### With `{ skipCode: false }` Option

````md eslint-check
<!-- eslint mark/no-irregular-whitespace: ["error", { skipCode: false }] -->

```md
\u000B - Line Tabulation (\v) - <VT>  <= Here
\u0085 - Next Line - <NEL>  <= Here
\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
\u2001 - Em Quad - <MQSP>   <= Here
\u2002 - En Space - <ENSP>   <= Here
\u2003 - Em Space - <EMSP>   <= Here
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>  <= Here
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>   <= Here
\u2007 - Figure Space - <FSP>   <= Here
\u2008 - Punctuation Space - <PUNCSP>   <= Here
\u2009 - Thin Space - <THSP>   <= Here
\u200A - Hair Space - <HSP>   <= Here
\u2028 - Line Separator - <LS> - <LSEP>   <= Here
\u2029 - Paragraph Separator - <PS> - <PSEP>   <= Here
\u202F - Narrow No-Break Space - <NNBSP>   <= Here
\u205F - Medium Mathematical Space - <MMSP>   <= Here
\u3000 - Ideographic Space - <IDSP>　 <= Here
```

````

#### With `{ skipInlineCode: false }` Option

```md eslint-check
<!-- eslint mark/no-irregular-whitespace: ["error", { skipInlineCode: false }] -->

`\u000B - Line Tabulation (\v) - <VT>  <= Here`
`\u0085 - Next Line - <NEL>  <= Here`
`\u1680 - Ogham Space Mark - <OGSP>   <= Here`
`\u2000 - En Quad - <NQSP>   <= Here`
`\u2001 - Em Quad - <MQSP>   <= Here`
`\u2002 - En Space - <ENSP>   <= Here`
`\u2003 - Em Space - <EMSP>   <= Here`
`\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here`
`\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>  <= Here`
`\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>   <= Here`
`\u2007 - Figure Space - <FSP>   <= Here`
`\u2008 - Punctuation Space - <PUNCSP>   <= Here`
`\u2009 - Thin Space - <THSP>   <= Here`
`\u200A - Hair Space - <HSP>   <= Here`
`\u2028 - Line Separator - <LS> - <LSEP>   <= Here`
`\u2029 - Paragraph Separator - <PS> - <PSEP>   <= Here`
`\u202F - Narrow No-Break Space - <NNBSP>   <= Here`
`\u205F - Medium Mathematical Space - <MMSP>   <= Here`
`\u3000 - Ideographic Space - <IDSP>　 <= Here`
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint mark/no-irregular-whitespace: "error" -->

\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
\u0020 - Space - <SP>   <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipCode: true }` Option

````md eslint-check
<!-- eslint mark/no-irregular-whitespace: ["error", { skipCode: true }] -->

```md
\u000B - Line Tabulation (\v) - <VT>  <= Here
\u0085 - Next Line - <NEL>  <= Here
\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
\u2001 - Em Quad - <MQSP>   <= Here
\u2002 - En Space - <ENSP>   <= Here
\u2003 - Em Space - <EMSP>   <= Here
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>  <= Here
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>   <= Here
\u2007 - Figure Space - <FSP>   <= Here
\u2008 - Punctuation Space - <PUNCSP>   <= Here
\u2009 - Thin Space - <THSP>   <= Here
\u200A - Hair Space - <HSP>   <= Here
\u2028 - Line Separator - <LS> - <LSEP>   <= Here
\u2029 - Paragraph Separator - <PS> - <PSEP>   <= Here
\u202F - Narrow No-Break Space - <NNBSP>   <= Here
\u205F - Medium Mathematical Space - <MMSP>   <= Here
\u3000 - Ideographic Space - <IDSP>　 <= Here
```

````

#### With `{ skipInlineCode: true }` Option

```md eslint-check
<!-- eslint mark/no-irregular-whitespace: ["error", { skipInlineCode: true }] -->

`\u000B - Line Tabulation (\v) - <VT>  <= Here`
`\u0085 - Next Line - <NEL>  <= Here`
`\u1680 - Ogham Space Mark - <OGSP>   <= Here`
`\u2000 - En Quad - <NQSP>   <= Here`
`\u2001 - Em Quad - <MQSP>   <= Here`
`\u2002 - En Space - <ENSP>   <= Here`
`\u2003 - Em Space - <EMSP>   <= Here`
`\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here`
`\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>  <= Here`
`\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>   <= Here`
`\u2007 - Figure Space - <FSP>   <= Here`
`\u2008 - Punctuation Space - <PUNCSP>   <= Here`
`\u2009 - Thin Space - <THSP>   <= Here`
`\u200A - Hair Space - <HSP>   <= Here`
`\u2028 - Line Separator - <LS> - <LSEP>   <= Here`
`\u2029 - Paragraph Separator - <PS> - <PSEP>   <= Here`
`\u202F - Narrow No-Break Space - <NNBSP>   <= Here`
`\u205F - Medium Mathematical Space - <MMSP>   <= Here`
`\u3000 - Ideographic Space - <IDSP>　 <= Here`
```

## Options

```js
'mark/no-irregular-whitespace': ['error', {
  skipCode: true,
  skipInlineCode: true,
}]
```

### `skipCode`

> Default: `true`

`true` allows any irregular whitespace in code blocks.

### `skipInlineCode`

> Default: `true`

`true` allows any irregular whitespace in inline code.

## When Not To Use It

If you decide that you wish to use whitespace other than tabs and spaces outside of strings in your document.

## Prior Art

- [`no-irregular-whitespace`](https://eslint.org/docs/latest/rules/no-irregular-whitespace)
- [`textlint-rule-no-zero-width-spaces`](https://github.com/textlint-rule/textlint-rule-no-zero-width-spaces)
