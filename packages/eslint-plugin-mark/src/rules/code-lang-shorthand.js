/**
 * @fileoverview Rule to enforce the use of shorthand for code block language identifiers.
 * @author 루밀LuMir(lumirlumir)
 * @see https://shiki.style/languages#bundled-languages
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ ignores: string[], override: Record<string, string> }]} RuleOptions
 * @typedef {'codeLangShorthand'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/** @satisfies {Record<string, string>} */
const langShorthandMap = Object.freeze({
  asciidoc: 'adoc',
  batch: 'bat',
  berry: 'be',
  bsl: '1c',
  cadence: 'cdc',
  clojure: 'clj',
  codeql: 'ql',
  coffeescript: 'coffee',
  'common-lisp': 'lisp',
  csharp: 'c#',
  cypher: 'cql',
  dockerfile: 'docker',
  'emacs-lisp': 'elisp',
  erlang: 'erl',
  fluent: 'ftl',
  'fortran-fixed-form': 'f',
  fsharp: 'f#',
  'glimmer-js': 'gjs',
  'glimmer-ts': 'gts',
  graphql: 'gql',
  handlebars: 'hbs',
  haskell: 'hs',
  properties: 'ini',
  javascript: 'js',
  jssm: 'fsl',
  julia: 'jl',
  kotlin: 'kt',
  kusto: 'kql',
  lean4: 'lean',
  makefile: 'make',
  markdown: 'md',
  mermaid: 'mmd',
  mipsasm: 'mips',
  narrat: 'nar',
  nextflow: 'nf',
  nushell: 'nu',
  'objective-c': 'objc',
  pot: 'po',
  potx: 'po',
  powershell: 'ps',
  protobuf: 'proto',
  jade: 'pug',
  python: 'py',
  perl6: 'raku',
  regexp: 'regex',
  ruby: 'rb',
  rust: 'rs',
  '1c-query': 'sdbl',
  shaderlab: 'shader',
  shellscript: 'sh',
  shell: 'sh',
  bash: 'sh',
  zsh: 'sh',
  shellsession: 'console',
  'closure-templates': 'soy',
  splunk: 'spl',
  stylus: 'styl',
  talonscript: 'talon',
  terraform: 'tf',
  text: 'txt',
  typescript: 'ts',
  typespec: 'tsp',
  typst: 'typ',
  vimscript: 'vim',
  vyper: 'vy',
  wikitext: 'wiki',
  mediawiki: 'wiki',
  wolfram: 'wl',
  yaml: 'yml',
});

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of shorthand for code block language identifiers',
      url: URL_RULE_DOCS('code-lang-shorthand'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          ignores: {
            type: 'array',
            items: {
              enum: Object.keys(langShorthandMap),
            },
            uniqueItems: true,
          },
          override: {
            type: 'object',
            additionalProperties: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        ignores: [],
        override: {},
      },
    ],

    messages: {
      codeLangShorthand: '`{{ lang }}` should be shortened to `{{ langShorthand }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      code(node) {
        const [{ ignores, override }] = context.options;
        const langShorthandMapMerged = Object.fromEntries(
          Object.entries({
            ...langShorthandMap,
            ...override, // `override` option handling.
          })
            .map(([key, value]) => [key.toLowerCase(), value.toLowerCase()]) // Normalize keys and values.
            .filter(([key]) => !ignores.includes(key)), // `ignores` option handling.
        );
        const langShorthand = langShorthandMapMerged[node.lang?.toLowerCase()]; // Normalize lang.

        if (langShorthand === undefined) return;

        const match = context.sourceCode.getText(node).match(node.lang);

        const matchIndexStart = match.index;
        const matchIndexEnd = matchIndexStart + match[0].length;

        context.report({
          loc: {
            start: {
              line: node.position.start.line,
              column: node.position.start.column + matchIndexStart,
            },
            end: {
              line: node.position.start.line,
              column: node.position.start.column + matchIndexEnd,
            },
          },

          data: {
            lang: node.lang, // Original lang.
            langShorthand,
          },

          messageId: 'codeLangShorthand',

          fix(fixer) {
            return fixer.replaceTextRange(
              [
                node.position.start.offset + matchIndexStart,
                node.position.start.offset + matchIndexEnd,
              ],
              langShorthand,
            );
          },
        });
      },
    };
  },
};
