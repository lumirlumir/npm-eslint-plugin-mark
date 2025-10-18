<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

The purpose of this rule is to enforce the use of shorthand language identifiers in code blocks. Some may want to use abbreviated language identifiers to keep the code blocks concise and consistent.

Using shorthand language identifiers offers several advantages: they improve readability by simplifying code, optimize file size, ensure consistency across code blocks, and make it easier for tools and automation systems to process language identifiers efficiently.

Note that the code block language identifiers are **case-insensitive**, meaning `JavaScript`, `javascript`, and `JAVASCRIPT` are all treated as the same language identifier.

You can see the full list of [language identifiers shorthand mapping](https://github.com/lumirlumir/npm-eslint-plugin-mark/blob/main/packages/eslint-plugin-mark/src/rules/code-lang-shorthand/code-lang-shorthand.js#L31-L101) in the source code.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

::: code-group

````md [incorrect.md] eslint-check
<!-- eslint mark/code-lang-shorthand: "error" -->

```javascript
console.log('Hello, world!');
```

```typescript
console.log('Hello, world!');
```

```markdown
Hello, world!
```
````

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/code-lang-shorthand': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

#### With `override: { example: 'ex' }` Option

::: code-group

````md [incorrect.md]
<!-- [!code word:example:1] -->
```example
Welcome to the example language!
```
````

```js [eslint.config.mjs] {5-7}
export default [
  // ...
  {
    rules: {
      'mark/code-lang-shorthand': ['error', { // [!code focus]
        override: { example: 'ex' }, // [!code focus]
      }], // [!code focus]
    },
  },
  // ...
];
```

:::

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

::: code-group

````md [correct.md]
```js
console.log('Hello, world!');
```

```ts
console.log('Hello, world!');
```

```md
Hello, world!
```
````

```js [eslint.config.mjs] {5}
export default [
  // ...
  {
    rules: {
      'mark/code-lang-shorthand': 'error', // [!code focus]
    },
  },
  // ...
];
```

:::

#### With `ignores: ['javascript', 'typescript']` Option

::: code-group

````md [correct.md]
```javascript
console.log('Hello, world!');
```

```typescript
console.log('Hello, world!');
```
````

```js [eslint.config.mjs] {5-7}
export default [
  // ...
  {
    rules: {
      'mark/code-lang-shorthand': ['error', { // [!code focus]
        ignores: ['javascript', 'typescript'], // [!code focus]
      }], // [!code focus]
    },
  },
  // ...
];
```

:::

## Options

```js
'mark/code-lang-shorthand': ['error', {
  ignores: [],
  override: {},
}]
```

### `ignores`

> Default: `[]`

An array of code block language identifiers to ignore. Each value should be a **lowercase**, unabridged language identifier.

For example, to ignore the `javascript` and `typescript` language identifiers:

```js
'mark/code-lang-shorthand': ['error', {
  ignores: ['javascript', 'typescript'],
}]
```

### `override`

> Default: `{}`

An object where the key is the unabridged language identifier and the value is the abbreviated form.

#### Adding a new abbreviation

For example, to shorten the `example` language identifier to `ex`:

```js
'mark/code-lang-shorthand': ['error', {
  override: {
    example: 'ex',
  },
}]
```

#### Overriding an existing abbreviation

For example, to change the default abbreviation for `javascript` to `mjs`:

```js
'mark/code-lang-shorthand': ['error', {
  override: {
    javascript: 'mjs',
  },
}]
```

## Fix

This rule converts unabridged code block language identifiers into their abbreviated forms.
