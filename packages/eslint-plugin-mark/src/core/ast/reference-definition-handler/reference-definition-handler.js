/**
 * @fileoverview Class to manage `ImageReference` and `LinkReference` nodes, along with their corresponding `Definition` nodes.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("mdast").ImageReference} ImageReference
 * @typedef {import("mdast").LinkReference} LinkReference
 * @typedef {import("mdast").Definition} Definition
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Class to manage `ImageReference` and `LinkReference` nodes, along with their corresponding `Definition` nodes.
 */
export default class ReferenceDefinitionHandler {
  // ------------------------------------------------------------------------------
  // Private Properties
  // ------------------------------------------------------------------------------

  /** @type {ImageReference[]} */
  #imageReferences = [];
  /** @type {LinkReference[]} */
  #linkReferences = [];
  /** @type {Definition[]} */
  #definitions = [];

  // ------------------------------------------------------------------------------
  // Public Methods
  // ------------------------------------------------------------------------------

  /**
   * Push an `ImageReference`, `LinkReference` or `Definition` node to the appropriate array.
   * @param {ImageReference | LinkReference | Definition} node
   */
  push(node) {
    if (node.type === 'imageReference') {
      this.#imageReferences.push(node);
    } else if (node.type === 'linkReference') {
      this.#linkReferences.push(node);
    } else if (node.type === 'definition') {
      this.#definitions.push(node);
    }

    return this;
  }

  /**
   * Check if a `Definition` node is an image definition.
   * @param {Definition} node
   */
  isImageDefinition(node) {
    return this.#imageReferences.some(ref => ref.identifier === node.identifier);
  }

  /**
   * Check if a `Definition` node is a link definition.
   * @param {Definition} node
   */
  isLinkDefinition(node) {
    return this.#linkReferences.some(ref => ref.identifier === node.identifier);
  }

  /**
   * Get all `Definition` nodes that are image definitions.
   */
  getImageDefinitions() {
    return this.#definitions.filter(def => this.isImageDefinition(def));
  }

  /**
   * Get all `Definition` nodes that are link definitions.
   */
  getLinkDefinitions() {
    return this.#definitions.filter(def => this.isLinkDefinition(def));
  }

  // ------------------------------------------------------------------------------
  // Getters and Setters
  // ------------------------------------------------------------------------------

  /**
   * Get the `ImageReference` nodes.
   */
  get imageReferences() {
    return this.#imageReferences;
  }

  /**
   * Get the `LinkReference` nodes.
   */
  get linkReferences() {
    return this.#linkReferences;
  }

  /**
   * Get the `Definition` nodes.
   */
  get definitions() {
    return this.#definitions;
  }
}
