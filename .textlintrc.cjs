module.exports = {
  rules: {
    'allowed-uris': {
      disallowed: {
        links: [/^\.\//],
      },
    },
  },
};
