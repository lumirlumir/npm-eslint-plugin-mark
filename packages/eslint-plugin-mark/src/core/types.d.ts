/**
 * @fileoverview Define common types.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Literal, Node, Parent, TextData, BreakData } from 'mdast'; // eslint-disable-line n/no-missing-import -- TODO: Remove this line after fixing the issue

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * Custom markdown text extension.
 */
export interface TextExt extends Literal, Parent {
  /**
   * Node type of custom markdown text extension.
   */
  type: 'textExt';
  /**
   * Data associated with the mdast text.
   */
  data?: TextData | undefined;
}

/**
 * Custom markdown line.
 */
export interface Line extends Literal {
  /**
   * Node type of custom markdown line.
   */
  type: 'line';
  /**
   * Data associated with the mdast text.
   */
  data?: TextData | undefined;
}

/**
 * Custom markdown line break.
 */
export interface LineBreak extends Node {
  /**
   * Node type of custom markdown line break.
   */
  type: 'lineBreak';
  /**
   * Data associated with the mdast break.
   */
  data?: BreakData | undefined;
}
