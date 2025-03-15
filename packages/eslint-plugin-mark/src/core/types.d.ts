/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Literal, Text } from 'mdast'; // eslint-disable-line n/no-missing-import -- TODO: Remove this line after fixing the issue

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * Custom markdown text extension.
 */
export interface TextExt extends Text {
  /**
   * Node type of custom markdown text extension.
   */
  type: 'textExt';
  /**
   * Children of the node.
   */
  children?: TextLine[] | undefined;
}

/**
 * Custom markdown text line.
 */
export interface TextLine extends Literal {
  /**
   * Node type of custom markdown text line.
   */
  type: 'textLine';
}
