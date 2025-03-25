import altText from './alt-text/index.js';
import codeLangShorthand from './code-lang-shorthand/index.js';
import noCurlyQuotes from './no-curly-quotes/index.js';
import noDoubleSpaces from './no-double-spaces/index.js';

export default [altText, codeLangShorthand, noCurlyQuotes, noDoubleSpaces].reduce(
  (rulesObject, rule) => {
    // @ts-expect-error -- TODO: https://github.com/eslint/eslint/issues/19521, https://github.com/eslint/eslint/issues/19523
    rulesObject[rule.meta.docs.name] = rule;
    return rulesObject;
  },
  {},
);
