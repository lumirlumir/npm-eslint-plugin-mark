# Shared Configurations

[ESLint shareable configurations](https://eslint.org/docs/latest/extend/shareable-configs) exist to provide a comprehensive list of rules settings that you can start with. [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-plugin-mark) includes built-in configurations you can extend from to pull in the recommended starting rules.

::: warning Stability of Configurations

With the exception of [`all`](#all), every configuration is considered "stable". Rule additions and removals are treated as ***breaking changes*** and will only be done in major version bumps.

---

NOTE: `eslint-markdown` is currently in active `0.x` development, so configurations may receive ***breaking changes*** in minor version bumps until it reaches `1.0.0`.

:::

::: danger Supported Environments

- This plugin only supports ***ECMAScript Modules (ESM)*** configurations. CommonJS configurations are not supported.
- This plugin only supports ***ESLint [`v9.15.0`](https://github.com/eslint/eslint/releases/tag/v9.15.0) and above***.

:::

## Configuration File Location

Create an `eslint.config.{js,mjs}` or `eslint.config.{ts,mts}` config file in the root of your project, and populate it with the following:

::: code-group

```js [eslint.config.mjs]
// @ts-check

import mark from 'eslint-markdown';

/** @type {import("eslint").Linter.Config[]} */
export default [
  mark.configs.recommendedGfm,
];
```

```ts [eslint.config.mts]
import mark from 'eslint-plugin-mark';
import type { Linter } from 'eslint';

export default [
  mark.configs.recommendedGfm,
] as Linter.Config[];
```

:::

## Configurations

### `recommended`

### `stylistic`

### `base`

### `all`

## Running ESLint

Open a terminal to the root of your project and run the following command:

::: code-group

```sh [npm]
npx eslint .
```

```sh [pnpm]
pnpm eslint .
```

```sh [yarn]
yarn eslint .
```

:::

ESLint will lint all Markdown files within the current folder, and will output the results to your terminal.
