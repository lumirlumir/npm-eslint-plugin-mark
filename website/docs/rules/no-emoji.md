<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Some websites and Markdown parsers handle emojis natively or provide their own plugins for support. Instead of using raw emojis like `😃`, you can use the `:smiley:`-style syntax, which places colons around the emoji name.

The main purpose of this rule is to discourage the use of raw (Unicode) emojis in Markdown files and encourage the use of the `:smiley:`-style shortcode syntax for better:

- Cross-platform rendering consistency
- Accessibility (screen readers can receive clearer text equivalents)
- Diff readability (pure text instead of glyphs)
- Theming or post-processing (shortcodes are easier to map or replace)

For a full list of supported emojis, refer to:

- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
- [emoji-cheat-sheet (GitHub)](https://github.com/ikatyang/emoji-cheat-sheet#readme)

Platforms like [GitHub](https://github.com) and Markdown plugins such as [`remark-emoji`](https://github.com/rhysd/remark-emoji#readme) and [`markdown-it-emoji`](https://github.com/markdown-it/markdown-it-emoji#readme) also support this shortcode feature.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

```md eslint-check
<!-- eslint mark/no-emoji: "error" -->

Smiley 😃
Unicorn 🦄
+1 👍
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

```md eslint-check
<!-- eslint mark/no-emoji: "error" -->

Smiley :smiley:
Unicorn :unicorn:
+1 :+1:
```

## Options

No options are available for this rule.

## Limitations

This rule uses [`emoji-regex`](https://github.com/mathiasbynens/emoji-regex#readme) internally to match emojis. Any emoji not supported by the current version of that regex will not be detected (for example, very recent Unicode additions until the dependency is updated).
