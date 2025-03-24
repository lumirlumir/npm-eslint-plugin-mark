/**
 * @fileoverview Vitepress site configuration.
 *
 * @see https://vitepress.dev/reference/site-config#site-config
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parse } from 'node:path';

import { generateGoogleAnalyticsScript } from 'bananass-utils-vitepress/head';
import footnote from 'markdown-it-footnote';
import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { codecovVitePlugin } from '@codecov/vite-plugin';
import isInteractive from 'is-interactive';
import rules from 'eslint-plugin-mark/rules';
import {
  transformerNotationWordHighlight,
  transformerMetaWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';

// --------------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------------

const TITLE = 'eslint-plugin-mark';
const DESCRIPTION = 'Lint your Markdown with ESLint.🛠️';
const AUTHOR = '루밀LuMir';
const SITE_URL = 'https://eslint-plugin-mark.lumir.page';
const GITHUB_URL = 'https://github.com/lumirlumir/npm-eslint-plugin-mark';
const NPM_URL = 'https://www.npmjs.com';
const GOOGLE_GA_ID = 'G-9KLYX5PTLT';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default defineConfig({
  /* Site Metadata */
  title: TITLE,
  description: DESCRIPTION,
  head: [
    // Basic
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/logo-small.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['meta', { name: 'title', content: TITLE }],
    ['meta', { name: 'theme-color', content: '#a0a0f5' }],
    ['meta', { name: 'author', content: AUTHOR }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'eslint, plugin, mark, markdown, lint, linting, eslint-plugin-mark',
      },
    ],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:title', content: TITLE }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/logo-og.png` }],
    ['meta', { property: 'og:image:width', content: '1280' }],
    ['meta', { property: 'og:image:height', content: '640' }],
    ['meta', { property: 'og:site_name', content: TITLE }],
    ['meta', { property: 'og:article:author', content: AUTHOR }],

    // Twitter
    ['meta', { name: 'twitter:url', content: SITE_URL }],
    ['meta', { name: 'twitter:title', content: TITLE }],
    ['meta', { name: 'twitter:description', content: DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}/logo-og.png` }],
    ['meta', { name: 'twitter:creator', content: AUTHOR }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],

    // Google Analytics
    ...generateGoogleAnalyticsScript(GOOGLE_GA_ID),
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
    hostname: SITE_URL,
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
          items: Object.keys(rules).map(ruleName => ({
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
        link: `${NPM_URL}/package/eslint-plugin-mark`,
        ariaLabel: 'npm package link for eslint-plugin-mark',
      },
      {
        icon: 'github',
        link: GITHUB_URL,
        ariaLabel: 'GitHub repository link for eslint-plugin-mark',
      },
    ],

    editLink: {
      pattern: `${GITHUB_URL}/edit/main/website/:path`,
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2024-${new Date().getFullYear()} <a href="https://github.com/lumirlumir">${AUTHOR}(lumirlumir)</a>`,
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
    ],
  },

  vite: {
    plugins: [
      groupIconVitePlugin(),
      codecovVitePlugin({
        // Put the Codecov vite plugin after all other plugins
        enableBundleAnalysis: !isInteractive(), // Works only in CI
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
      const rule = rules[ruleName];

      pageData.title = ruleName;
      pageData.frontmatter.title = ruleName;
      pageData.frontmatter.rule = `

<p>
  ${(rule.meta.docs.recommended ?? false) ? '<code class="rule-emoji">✅ Recommended</code>' : ''}
  ${(rule.meta.fixable ?? false) ? '<code class="rule-emoji">🔧 Fixable</code>' : ''}
  ${(rule.meta.docs.suggestion ?? false) ? '<code class="rule-emoji">💡 Suggestion</code>' : ''}
  ${(rule.meta.dialects.includes('commonmark') ?? false) ? '<code class="rule-emoji">⭐ CommonMark</code>' : ''}
  ${(rule.meta.dialects.includes('gfm') ?? false) ? '<code class="rule-emoji">🌟 GFM</code>' : ''}
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

`;
    }

    return pageData;
  },
});
