<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

TODO

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-tab: 'error' -->

\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipCode: false }` Option

<!-- markdownlint-disable no-hard-tabs -->

`````md eslint-check
<!-- eslint md/no-tab: ['error', { skipCode: false }] -->

```md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

````md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
````

~~~txt
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
~~~

    \u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
`````

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipInlineCode: false }` Option

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-tab: ['error', { skipInlineCode: false }] -->

\u0009 - Horizontal Tab (\t) - <TAB> `	` <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-tab: 'error' -->

\u0020 - Space - <SP>   <= Here
```

#### With `{ skipCode: true }` Option

<!-- markdownlint-disable no-hard-tabs -->

`````md eslint-check
<!-- eslint md/no-tab: ['error', { skipCode: true }] -->

```md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

````md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
````

~~~txt
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
~~~

    \u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
`````

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipInlineCode: true }` Option

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-tab: ['error', { skipInlineCode: true }] -->

\u0009 - Horizontal Tab (\t) - <TAB> `	` <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

## Options

```js
'md/no-tab': ['error', {
  skipCode: true,
  skipInlineCode: true,
  tabWidth: 4,
}]
```

### `skipCode`

> Type: `boolean` / Default: `true`

`true` allows any tabs in code blocks.

### `skipInlineCode`

> Type: `boolean` / Default: `true`

`true` allows any tabs in inline code.

### `tabWidth`

> Type: `number` / default: `4`

Number of spaces to replace each tab with when applying an autofix.

## Fix

This rule fixes the tab characters by replacing them with spaces. The number of spaces used for each tab is determined by the [`tabWidth`](#tabwidth) option.

## When Not To Use It

If you decide that you wish to use tabs for alignment or other purposes in your Markdown files, you might choose to disable this rule.

## Prior Art

- [`MD010` - Hard tabs](https://github.com/DavidAnson/markdownlint/blob/main/doc/md010.md#md010---hard-tabs)
- [`remark-lint-no-tabs`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-tabs#remark-lint-no-tabs)
