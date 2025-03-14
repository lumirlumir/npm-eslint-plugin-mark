# `no-curly-quotes`

<kbd>Recommended ✅</kbd> <kbd>Fixable 🛠️</kbd>

Disallow curly quotes(`“`, `”`, `‘` or `’`) in text

## Rule Details

The purpose of this rule is to allow the use of ASCII characters in the editor and optionally convert them to curly symbols during rendering, using a parser that supports this feature, such as the Typographer extension of [Goldmark](https://github.com/yuin/goldmark) or [SmartyPants](https://daringfireball.net/projects/smartypants/).

Additionally, curly quotes (`“`(`\u201C`), `”`(`\u201D`), `‘`(`\u2018`) or `’`(`\u2019`)), which are often introduced by word processors like Word, Google Docs, and Pages, can cause unwanted issues in code and markup. This rule helps keep your code clean and consistent by preventing unintended curly quotes.

This rule only checks for curly quotes and applies only to [`text`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#text) node.
### ❌ Incorrect

Examples of **incorrect** code for this rule:

```md
“foo bar”
‘foo bar’
```

### ✅ Correct

Examples of **correct** code for this rule:

```md
"foo bar"
'foo bar'
```

## Fix

This rule fixes the curly quotes by replacing them with straight quotes.

## Prior Art

- [textlint-rule-no-curly-quotes](https://github.com/aborazmeh/textlint-rule-no-curly-quotes)
