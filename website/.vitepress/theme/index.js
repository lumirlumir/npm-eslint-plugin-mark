/**
 * @fileoverview VitePress theme entry file.
 *
 * @see https://vitepress.dev/guide/custom-theme#using-a-custom-theme
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import theme from 'vitepress/theme';

import './style.css';
import 'virtual:group-icons.css'; // eslint-disable-line n/no-missing-import

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {import('vitepress').Theme} */
export default theme;
