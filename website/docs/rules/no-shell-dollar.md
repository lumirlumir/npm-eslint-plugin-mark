<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Shell commands in documentation are often prefixed with a dollar sign (`$`) to imitate a command prompt. When the code block contains commands only, that prefix carries no information and gets in the way: readers who copy the block have to strip every `$` before the commands will run, and some tools that copy code blocks include the prefix verbatim.

The prefix is useful in one case, which is when the code block also shows the output of the commands. There, the `$` is what separates what you type from what the terminal prints back.

This rule therefore reports a dollar sign prefix only when **every** non-blank line of a code block is a prefixed command. Blank lines are ignored, and a block that mixes commands with their output is left alone.

A line counts as a prefixed command when it starts with a dollar sign followed by at least one space or tab, allowing for leading indentation. So `$npm install` and a bare `$` are treated as regular content.

A command continued with a trailing backslash carries on into the next line, and that continuation line is part of the command rather than output. It has no prompt of its own, so nothing is reported on it.

Both fenced and indented code blocks are checked, and the language identifier is not taken into account unless it is listed in the [`skipCode`](#skipcode) option.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/no-shell-dollar: 'error' -->

```sh
$ npm install
```

```sh
$ npm install
$ npm run build
```

```
$ ls
```

    $ ls

```sh
$ npm install \
    --save-dev eslint
```
````

#### With `skipCode: ['console']` Option

````md eslint-check
<!-- eslint md/no-shell-dollar: ['error', { skipCode: ['console'] }] -->

```sh
$ npm install
```
````

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/no-shell-dollar: 'error' -->

```sh
npm install
npm run build
```

```sh
$ npm --version
10.9.2
```

```sh
$npm install
```

```sh
echo $PATH
```

```sh
$ npm install \
    --save-dev eslint
added 1 package
```
````

#### With `skipCode: ['console']` Option

````md eslint-check
<!-- eslint md/no-shell-dollar: ['error', { skipCode: ['console'] }] -->

```console
$ npm install
```
````

## Options

```js
'md/no-shell-dollar': ['error', {
  skipCode: [],
}]
```

### `skipCode`

> Type: `string[]` / Default: `[]`

An array of code block language identifiers to skip. A code block whose language identifier is listed here is neither reported nor fixed.

The values are compared with the language identifier as written, so `sh` and `SH` are different values.

For example, to allow the prompt prefix in code blocks that represent a terminal session:

```js
'md/no-shell-dollar': ['error', {
  skipCode: ['console'],
}]
```

Code blocks without a language identifier, including indented code blocks, cannot be skipped through this option.

## Fix

This rule removes the dollar sign and the whitespace that follows it, leaving the indentation of the line untouched.

## Prior Art

- [`MD014` - Dollar signs used before commands without showing output](https://github.com/DavidAnson/markdownlint/blob/main/doc/md014.md#md014---dollar-signs-used-before-commands-without-showing-output)
- [`remark-lint-no-shell-dollars`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-shell-dollars#remark-lint-no-shell-dollars)
