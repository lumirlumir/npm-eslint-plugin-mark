# Shared Configurations

[ESLint shareable configurations](https://eslint.org/docs/latest/extend/shareable-configs) exist to provide a comprehensive list of rules settings that you can start with. [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-markdown) includes built-in configurations you can extend from to pull in the recommended starting rules.

::: warning Stability of Configurations

With the exception of [`all`](#all), every configuration is considered "stable". Rule additions and removals are treated as ***breaking changes*** and will only be done in major version bumps.

:::

::: danger Active `0.x` Development Notice

`eslint-markdown` is currently in active `0.x` development, so minor releases may include [***Breaking Changes***](versioning.md#major-release-breaking-changes) until it reaches `1.0.0`.

:::

## Configuration File Location

Create an [`eslint.config.{js,mjs,cjs,ts,mts,cts}`](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) configuration file in the root of your project, and populate it with the following:

::: tip When to use Extends vs Cascading

You can find more details about it in the [ESLint documentation](https://eslint.org/docs/latest/use/configure/configuration-files#when-to-use-extends-vs-cascading).

:::

### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.recommended,
]);
```

```ts [eslint.config.mts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.recommended,
]);
```

### Extends Style

TODO

:::

## Configurations

### `recommended`

TODO

### `stylistic`

TODO

### `base`

TODO

### `all`

TODO

<!--
  TODO: This plugin already includes the rules for the `@eslint/mark` plugin. You can add the rules to your ESLint configuration file.
-->
