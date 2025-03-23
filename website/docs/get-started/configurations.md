# Shared Configurations

[ESLint shareable configurations](https://eslint.org/docs/latest/extend/shareable-configs) exist to provide a comprehensive list of rules settings that you can start with. `eslint-plugin-mark` includes built-in configurations you can extend from to pull in the recommended starting rules.

::: danger

- This plugin only supports ***ECMAScript Modules (ESM)*** configurations. CommonJS configurations are not supported.
- This plugin only supports ***ESLint `v9.0.0` and above***.

:::

## Configuration File Location

Create an `eslint.config.mjs` or `eslint.config.mts` config file in the root of your project, and populate it with the following:

::: code-group

```js [eslint.config.mjs]
// @ts-check

import mark from 'eslint-plugin-mark';

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

### `mark.configs.recommendedCommonmark`

### `mark.configs.recommendedGfm`

### `mark.configs.allCommonmark`

### `mark.configs.allGfm`

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
