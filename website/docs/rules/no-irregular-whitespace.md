<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Overview

Invalid or irregular whitespace can cause issues with Markdown parsers and also makes code harder to debug in a similar nature to mixed tabs and spaces.

Various whitespace characters can be inputted by programmers by mistake for example from copying or keyboard shortcuts. Pressing Alt + Space on macOS adds in a non breaking space character for example.

A simple fix for this problem could be to rewrite the offending line from scratch. This might also be a problem introduced by the text editor: if rewriting the line does not fix it, try using a different editor.

Known issues these spaces cause:

- Ogham Space Mark
  - Is a valid token separator, but is rendered as a visible glyph in most typefaces, which may be misleading in source code.
- Mongolian Vowel Separator
  - Is no longer considered a space separator since Unicode 6.3. It could result in a error in Markdown parsers.
- Line Separator and Paragraph Separator
  - Can cause issues with Markdown parsers that expect traditional line breaks (`\n` or `\r\n`). Many Markdown implementations may not properly recognize these as line terminators, leading to incorrectly formatted content or rendering problems.
- Zero Width Space
  - Is NOT considered a separator for tokens.
  - Is NOT shown in modern browsers making code repository software expected to resolve the visualization.

## Rule Details

This rule is aimed at catching invalid whitespace that is not a normal tab and space. Some of these characters may cause issues in modern browsers and others will be a debugging issue to spot.

This rule disallows the following characters except where the options allow:

```txt
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u00A0 - No-Break Space - <NBSP>
\u0085 - Next Line - <NEL>
\u1680 - Ogham Space Mark - <OGSP>
\u180E - Mongolian Vowel Separator - <MVS>
\ufeff - Zero Width No-Break Space - <BOM>
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
\u205f - Medium Mathematical Space - <MMSP>
\u3000 - Ideographic Space - <IDSP>
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

## AST

This rule applies only to the [`Root`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#root) node.

## Prior Art

- [`no-irregular-whitespace`](https://eslint.org/docs/latest/rules/no-irregular-whitespace)
- [`textlint-rule-no-zero-width-spaces`](https://github.com/textlint-rule/textlint-rule-no-zero-width-spaces)
