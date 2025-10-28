---
description: "This project adheres to Semantic Versioning."
---

# Versioning

This project adheres to [Semantic Versioning (SemVer)](https://semver.org/).

However, due to the nature of `eslint-markdown` as a Markdown quality tool, it's not always clear when a minor or major version bump occurs. To help clarify this for everyone, we've defined the following semantic versioning policy for `eslint-markdown`.

According to our policy, any minor update may report more linting errors than the previous release (ex: from a bug fix). As such, we recommend using the tilde (`~`) in `package.json` e.g. `"eslint-markdown": "~1.1.0"` to guarantee the results of your builds.

::: warning WARNING: Active `0.x` Development

`eslint-markdown` is currently in active `0.x` development, so minor releases may include [***Breaking Changes***](#major-release-breaking-changes) until it reaches `1.0.0`.

:::

---

[[TOC]]

## Patch Release

> Intended to not break your lint build.

- Rules
  - A bug fix in a rule that results in reporting fewer linting errors.
  - A bug fix to the core.
  - Changes to a rule's description or other metadata.
- Configs
  - N/A
- Others
  - Improvements to documentation.
  - Non-user-facing changes such as refactoring code, adding, deleting, or modifying tests, and increasing test coverage.
  - Re-releasing after a failed release (i.e., publishing a release that doesn't work for anyone).

## Minor Release

> Might break your lint build.

- Rules
  - A bug fix in a rule that results in reporting more linting errors.
  - A new rule is created.
  - A new option to an existing rule that does not result in reporting more linting errors by default.
  - A new fixer or suggestion for an existing rule.
  - An existing rule is deprecated.
- Configs
  - `all` config is updated. (e.g., rule additions, rule removals, most rule option updates).
- Others
  - New capabilities to the public API are added (new classes, new methods, new arguments to existing methods, etc.).

## Major Release (Breaking Changes)

> Likely to break your lint build.

- Rules
  - A new option to an existing rule that results in ESLint reporting more linting errors by default.
  - Removes or renames a rule.
  - Removes or renames an option.
  - Changes the default option of a rule.
  - Changes a rule's schema to be stricter.
- Configs
  - `recommended` config is updated. (e.g., rule additions, rule removals, most rule option updates).
  - `stylistic` config is updated. (e.g., rule additions, rule removals, most rule option updates).
  - `base` config is updated.
- Others
  - Part of the public API is removed or changed in an incompatible way.
