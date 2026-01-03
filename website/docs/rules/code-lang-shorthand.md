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

````md eslint-check
<!-- eslint mark/code-lang-shorthand: 'error' -->

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

#### With `override: { example: 'ex' }` Option

````md eslint-check
<!-- eslint mark/code-lang-shorthand: ['error', { override: { example: 'ex' } }] -->

```example
Welcome to the example language!
```
````

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

````md eslint-check
<!-- eslint mark/code-lang-shorthand: 'error' -->

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

#### With `allow: ['javascript', 'typescript']` Option

````md eslint-check
<!-- eslint mark/code-lang-shorthand: ['error', { allow: ['javascript', 'typescript'] }] -->

```javascript
console.log('Hello, world!');
```

```typescript
console.log('Hello, world!');
```
````

## Options

```js
'mark/code-lang-shorthand': ['error', {
  allow: [],
  override: {},
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

An array of code block language identifiers to allow. Each value should be a **lowercase**, unabridged language identifier.

For example, to allow the `javascript` and `typescript` language identifiers:

```js
'mark/code-lang-shorthand': ['error', {
  allow: ['javascript', 'typescript'],
}]
```

### `override`

> Type: `Record<string, string>` / Default: `{}`

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
