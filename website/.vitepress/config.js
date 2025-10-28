/**
 * @fileoverview Vitepress site configuration.
 * @see https://vitepress.dev/reference/site-config#site-config
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parse } from 'node:path';

import mark from 'eslint-plugin-mark';
import {
  PKG_NAME,
  PKG_DESCRIPTION,
  PKG_AUTHOR,
  URL_HOMEPAGE,
  URL_GITHUB,
  URL_NPM,
  URL_RULE_SRC,
} from 'eslint-plugin-mark/core/constants';

import footnote from 'markdown-it-footnote';
import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { codecovVitePlugin } from '@codecov/vite-plugin';
import {
  transformerNotationWordHighlight,
  transformerMetaWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { createTwoslasher } from 'twoslash-eslint';

// --------------------------------------------------------------------------------
// Constant
// --------------------------------------------------------------------------------

const GOOGLE_GA_ID = 'G-9KLYX5PTLT';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default defineConfig({
  /* Site Metadata */
  title: PKG_NAME,
  description: PKG_DESCRIPTION,
  head: [
    // Basic
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/logo-small.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['meta', { name: 'title', content: PKG_NAME }],
    ['meta', { name: 'theme-color', content: '#a0a0f5' }],
    ['meta', { name: 'author', content: PKG_AUTHOR }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'eslint, plugin, mark, markdown, lint, linting, eslint-plugin-mark',
      },
    ],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: URL_HOMEPAGE }],
    ['meta', { property: 'og:title', content: PKG_NAME }],
    ['meta', { property: 'og:description', content: PKG_DESCRIPTION }],
    ['meta', { property: 'og:image', content: `${URL_HOMEPAGE}/logo-og.png` }],
    ['meta', { property: 'og:image:width', content: '1280' }],
    ['meta', { property: 'og:image:height', content: '640' }],
    ['meta', { property: 'og:site_name', content: PKG_NAME }],
    ['meta', { property: 'og:article:author', content: PKG_AUTHOR }],

    // Twitter
    ['meta', { name: 'twitter:url', content: URL_HOMEPAGE }],
    ['meta', { name: 'twitter:title', content: PKG_NAME }],
    ['meta', { name: 'twitter:description', content: PKG_DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: `${URL_HOMEPAGE}/logo-og.png` }],
    ['meta', { name: 'twitter:creator', content: PKG_AUTHOR }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],

    // Google Analytics
    [
      'script',
      { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_GA_ID}` },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_GA_ID}');`,
    ],
  ],
  lang: 'en-US',

  /* Routing */
  cleanUrls: true,

  /* Build */
  outDir: 'build',
  metaChunk: true,

  /* Theming */
  lastUpdated: true,

  /* Sitemap */
  sitemap: {
    hostname: URL_HOMEPAGE,
  },

  /* Theme Configuration */
  themeConfig: {
    logo: {
      src: '/logo.svg',
      alt: 'eslint-plugin-mark Logo',
    },

    outline: {
      level: 'deep',
    },

    nav: [
      // TODO: From here
      {
        text: 'Get Started',
        activeMatch: '/docs/(?:get-started|community)',
        items: [
          {
            text: 'Get Started',
            link: '/docs/get-started',
            activeMatch: '/docs/get-started',
          },
          {
            text: 'Community',
            link: '/docs/community/code-of-conduct',
            activeMatch: '/docs/community',
          },
        ],
      },
      {
        text: 'Rules',
        link: '/docs/rules',
        activeMatch: '/docs/rules',
      },
      {
        text: 'Configs',
        link: '/docs/get-started/configurations',
        activeMatch: '/docs/get-started/configurations',
      },
    ],

    sidebar: {
      '/docs/rules/': [
        {
          base: '/docs/rules/',
          text: 'Rules',
          link: '/',
          collapsed: false,
          items: Object.keys(mark.rules).map(ruleName => ({
            text: ruleName,
            link: ruleName,
          })),
        },
      ],

      '/docs/': [
        {
          base: '/docs/get-started/',
          text: 'Get Started',
          link: '/',
          collapsed: false, // Set it `false` to show `>` icon.
          items: [
            {
              text: 'Introduction',
              link: 'introduction',
            },
            {
              text: 'Installation',
              link: 'installation',
            },
            {
              text: 'Configurations',
              link: 'configurations',
            },
            {
              text: 'Dependency Versions',
              link: 'dependency-versions',
            },
            {
              text: 'Versioning',
              link: 'versioning',
            },
          ],
        },

        {
          base: '/docs/community/',
          text: 'Community',
          collapsed: true,
          items: [
            {
              text: 'Code of Conduct',
              link: 'code-of-conduct',
            },
            {
              text: 'Contributing',
              link: 'contributing',
            },
            {
              text: 'Change Log',
              link: 'change-log',
            },
            {
              text: 'Security',
              link: 'security',
            },
            {
              text: 'License',
              link: 'license',
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'npm',
        link: `${URL_NPM}/package/eslint-plugin-mark`,
        ariaLabel: 'npm package link for eslint-plugin-mark',
      },
      {
        icon: 'github',
        link: URL_GITHUB,
        ariaLabel: 'GitHub repository link for eslint-plugin-mark',
      },
    ],

    editLink: {
      pattern: `${URL_GITHUB}/edit/main/website/:path`,
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2024-${new Date().getFullYear()} <a href="https://github.com/lumirlumir">${PKG_AUTHOR}(lumirlumir)</a>`,
    },
  },

  markdown: {
    config(md) {
      md.use(footnote);
      md.use(groupIconMdPlugin);
    },

    codeTransformers: [
      transformerNotationWordHighlight(), // https://shiki.style/packages/transformers#transformernotationwordhighlight
      transformerMetaWordHighlight(), // https://shiki.style/packages/transformers#transformermetawordhighlight
      transformerRenderWhitespace(), // https://shiki.style/packages/transformers#transformerrenderwhitespace
      transformerTwoslash({
        langs: ['md', 'markdown'],
        errorRendering: 'hover',
        explicitTrigger: /\beslint-check\b/,
        twoslasher: createTwoslasher({
          eslintConfig: [mark.configs.baseGfm],
        }),
      }),
    ],
  },

  vite: {
    plugins: [
      groupIconVitePlugin(),
      codecovVitePlugin({
        // Put the Codecov vite plugin after all other plugins
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined, // Works only in CI when CODECOV_TOKEN is set
        bundleName: 'website',
        uploadToken: process.env.CODECOV_TOKEN,
        gitService: 'github',
      }),
    ],
  },

  transformPageData(pageData) {
    // Process only the files inside `docs/rules/`, excluding `index.md`.
    if (/^docs\/rules\/(?!index).+/.test(pageData.relativePath)) {
      const ruleName = parse(pageData.relativePath).name;
      const rule = mark.rules[ruleName];

      pageData.title = ruleName;
      pageData.frontmatter.title = ruleName;
      pageData.frontmatter.rule = `

<h1>
  <code>${ruleName}</code>
</h1>
<p>
  ${(rule.meta.docs.recommended ?? false) ? '<code class="rule-emoji">✅ Recommended</code>' : ''}
  ${(rule.meta.docs.stylistic ?? false) ? '<code class="rule-emoji">🎨 Stylistic</code>' : ''}
  ${(rule.meta.fixable ?? false) ? '<code class="rule-emoji">🔧 Fixable</code>' : ''}
  ${(rule.meta.docs.suggestion ?? false) ? '<code class="rule-emoji">💡 Suggestion</code>' : ''}
  ${(rule.meta.dialects.includes('commonmark') ?? false) ? '<code class="rule-emoji">⭐ CommonMark</code>' : ''}
  ${(rule.meta.dialects.includes('gfm') ?? false) ? '<code class="rule-emoji">🌟 GFM</code>' : ''}
</p>
<p>
  <code class="rule-emoji">🔗 <a target="_blank" href="${URL_RULE_SRC}/${ruleName}.js">Rule Source</a></code>
  <code class="rule-emoji">🔗 <a target="_blank" href="${URL_RULE_SRC}/${ruleName}.test.js">Test Source</a></code>
</p>
<p>
  ${(rule.meta.docs.description ?? '')
    .split(/(`[^`]+`)/)
    .map(part =>
      part.startsWith('`') && part.endsWith('`')
        ? `<code>${part.slice(1, -1)}</code>`
        : part,
    )
    .join('')}.
</p>

${
  !rule.meta.dialects.includes('commonmark') && rule.meta.dialects.includes('gfm')
    ? '<div class="caution custom-block github-alert" bis_skin_checked="1"><p class="custom-block-title">GFM Only</p><p></p><p>This rule applies only when GFM (GitHub Flavored Markdown) is enabled by setting the <code>language</code> mode to <code>markdown/gfm</code>.</p></div>'
    : ''
}

`;
    }

    return pageData;
  },
});
