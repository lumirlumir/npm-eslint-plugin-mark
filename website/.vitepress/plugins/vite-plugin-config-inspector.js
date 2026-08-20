/**
 * @fileoverview Redirects the built config inspector route to its local development server.
 */

/* eslint-disable import/prefer-default-export */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const CONFIG_INSPECTOR_PATH = '/inspector/eslint-markdown';
const CONFIG_INSPECTOR_DEV_URL = 'http://localhost:7777/';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Vite plugin that redirects the built config inspector route to its local development server.
 * @returns {import("vite").Plugin}
 */
export function vitePluginConfigInspector() {
  return {
    name: 'vite-plugin-config-inspector',

    configureServer(server) {
      server.middlewares.use(CONFIG_INSPECTOR_PATH, (_, response) => {
        response.writeHead(302, {
          Location: CONFIG_INSPECTOR_DEV_URL,
        });
        response.end();
      });
    },
  };
}
