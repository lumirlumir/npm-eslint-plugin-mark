---
description: "Installation instructions for `eslint-plugin-mark` npm package with support for local installs using npm, pnpm, yarn, and bun."
---

# Installation {#installation}

## Prerequisites

- Node.js: `^20.19.0 || ^22.13.0 || >=24.0.0`
- ESLint: `^9.15.0 || ^10.0.0` & Flat Config Only
- Module Support: ECMAScript Modules (ESM) Only

::: tip NOTE

In line with the [ESLint v10 prerequisites](https://github.com/eslint/eslint?tab=readme-ov-file#installation-and-usage), we support only Node.js versions `^20.19.0 || ^22.13.0 || >=24.0.0`, and since we use the [`meta.defaultOptions`](https://github.com/eslint/eslint/releases/tag/v9.15.0) feature introduced in ESLint v9.15.0, the minimum required ESLint version is `^9.15.0`.

:::

## Installation (`@latest`)

[![npm package eslint-plugin-mark latest version](https://img.shields.io/npm/v/eslint-plugin-mark?label=eslint-plugin-mark@latest&color=6358d4&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-plugin-mark)

> Latest stable release.

::: code-group

```sh [npm]
$ npm install -D eslint-plugin-mark@latest eslint@latest
```

```sh [pnpm]
$ pnpm add -D eslint-plugin-mark@latest eslint@latest
```

```sh [yarn]
$ yarn add --dev eslint-plugin-mark@latest eslint@latest
```

```sh [bun]
$ bun add -d eslint-plugin-mark@latest eslint@latest
```

:::

## Installation (`@next`)

[![npm package eslint-plugin-mark next version](https://img.shields.io/npm/v/eslint-plugin-mark/next?label=eslint-plugin-mark@next&color=6358d4&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-plugin-mark)

> Latest pre-release version. (e.g., `canary`, `alpha`, `beta`, and `rc`)

::: code-group

```sh [npm]
$ npm install -D eslint-plugin-mark@next eslint@latest
```

```sh [pnpm]
$ pnpm add -D eslint-plugin-mark@next eslint@latest
```

```sh [yarn]
$ yarn add --dev eslint-plugin-mark@next eslint@latest
```

```sh [bun]
$ bun add -d eslint-plugin-mark@next eslint@latest
```

:::
