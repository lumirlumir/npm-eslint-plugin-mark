/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Literal, Text } from 'mdast';

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
