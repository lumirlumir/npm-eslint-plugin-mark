import noCurlyQuotes from './no-curly-quotes/index.js';
import noDoubleSpaces from './no-double-spaces/index.js';

export default [noCurlyQuotes, noDoubleSpaces].map(rule => ({
  // @ts-ignore -- TODO: https://github.com/eslint/eslint/issues/19521, https://github.com/eslint/eslint/issues/19523
  [rule.meta.docs.name]: rule,
}));
