<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint mark/consistent-thematic-break-style: "error" -->

---

***

___

---
```

```md eslint-check
<!-- eslint mark/consistent-thematic-break-style: "error" -->

***

___

---

***
```

```md eslint-check
<!-- eslint mark/consistent-thematic-break-style: "error" -->

___

---

***

___
```

#### With `{ style: '-----' }` Option

```md eslint-check
<!-- eslint mark/consistent-thematic-break-style: ["error", { style: '-----' }] -->

---

***

___
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint mark/consistent-thematic-break-style: "error" -->

---

---

---

---
```

## Prior Art

- [MD035 - Horizontal rule style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md035.md#md035---horizontal-rule-style)
- [`remark-lint-rule-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-rule-style#remark-lint-rule-style)
