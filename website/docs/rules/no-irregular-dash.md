<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule is aimed at identifying and preventing the use of irregular dash characters in Markdown documents. Irregular dashes can cause issues with Markdown parsers, create inconsistencies in document formatting, and lead to potential rendering problems across different platforms.

The rule helps ensure that only standard ASCII hyphen-minus characters (`-`, `\u002D`) are used instead of their Unicode lookalikes, which improves document consistency and prevents potential parsing problems.

This rule disallows the following characters except where the options allow:

```txt
\u2010 - Hyphen - <HYPH>
\u2011 - Non-Breaking Hyphen - <NBHY>
\u2012 - Figure Dash - <FIGDASH>
\u2013 - En Dash - <ENDASH>
\u2014 - Em Dash - <EMDASH>
\u2015 - Horizontal Bar - <HYPHBAR>
\u2043 - Hyphen Bullet - <HYPHBUL>
\u2212 - Minus Sign - <MINUS>
\u23af - Horizontal Line Extension - <HLINE>
\u2e3a - Two Em Dash - <2EMDASH>
\u2e3b - Three Em Dash - <3EMDASH>
\u30fc - Katakana-Hiragana Prolonged Sound Mark - <KHPROLSND>
\ufe58 - Small Em Dash - <SMEMDASH>
\ufe63 - Small Hyphen Minus - <SMHYPMINUS>
\uff0d - Fullwidth Hyphen-Minus - <FWHYPHMNUS>
```

## Options

```js
'mark/no-irregular-dash': ['error', {
  skipCode: true,
  skipInlineCode: true,
}]
```

### `skipCode`

> Default: `true`

`true` allows any irregular dash in code blocks.

### `skipInlineCode`

> Default: `true`

`true` allows any irregular dash in inline code.

## When Not To Use It

If you deliberately want to use typographically correct dash characters in your Markdown documents, such as em dashes for parenthetical statements or en dashes for ranges, you may want to disable this rule.
