module.exports = {
  '*': [
    'npx prettier --check',
    'npx editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': 'npx eslint',
  '*.md': ['npx markdownlint', 'npx textlint -f pretty-error'],
};
