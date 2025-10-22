<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint mark/consistent-emphasis-style: "error" -->

*foo*

_bar_

*baz*
```

```md eslint-check
<!-- eslint mark/consistent-emphasis-style: "error" -->

_foo_

*bar*

_baz_
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint mark/consistent-emphasis-style: ["error", { style: '*' }] -->

*hi*

_hi_
```

#### With `{ style: '_' }` Option

```md eslint-check
<!-- eslint mark/consistent-emphasis-style: ["error", { style: '_' }] -->

_hi_

*hi*
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint mark/consistent-emphasis-style: "error" -->

*foo*

*bar*

*baz*
```

```md eslint-check
<!-- eslint mark/consistent-emphasis-style: "error" -->

_foo_

_bar_

_baz_
```

## Prior Art

- [MD049 - Emphasis style](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md049---emphasis-style)
- [`remark-lint-emphasis-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-emphasis-marker#remark-lint-emphasis-marker)
