export default {
  '*': [
    'npx prettier --write --ignore-unknown',
    'npx editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,json5,md}': 'npx eslint --fix',
  '*.md': ['npx markdownlint --fix'],
};
