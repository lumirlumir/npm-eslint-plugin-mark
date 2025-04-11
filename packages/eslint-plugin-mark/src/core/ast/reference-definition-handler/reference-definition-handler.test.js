/**
 * @fileoverview Test for `reference-definition-handler.js`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';

import { getFileName } from '../../helpers/index.js';

import ReferenceDefinitionHandler from './reference-definition-handler.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const imageReference1 = {
  type: 'imageReference',
  alt: '',
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0,
    },
    end: {
      line: 1,
      column: 12,
      offset: 11,
    },
  },
  label: 'image1',
  identifier: 'image1',
  referenceType: 'full',
};

const imageReference2 = {
  type: 'imageReference',
  alt: '',
  position: {
    start: {
      line: 9,
      column: 1,
      offset: 102,
    },
    end: {
      line: 9,
      column: 12,
      offset: 113,
    },
  },
  label: 'common',
  identifier: 'common',
  referenceType: 'full',
};

const linkReference1 = {
  type: 'linkReference',
  children: [],
  position: {
    start: {
      line: 5,
      column: 1,
      offset: 55,
    },
    end: {
      line: 5,
      column: 10,
      offset: 64,
    },
  },
  label: 'link1',
  identifier: 'link1',
  referenceType: 'full',
};

const linkReference2 = {
  type: 'linkReference',
  children: [],
  position: {
    start: {
      line: 10,
      column: 1,
      offset: 114,
    },
    end: {
      line: 10,
      column: 11,
      offset: 124,
    },
  },
  label: 'common',
  identifier: 'common',
  referenceType: 'full',
};

const definition1 = {
  type: 'definition',
  identifier: 'image1',
  label: 'image1',
  title: null,
  url: 'https://example.com/image1.jpg',
  position: {
    start: {
      line: 3,
      column: 1,
      offset: 13,
    },
    end: {
      line: 3,
      column: 41,
      offset: 53,
    },
  },
};

const definition2 = {
  type: 'definition',
  identifier: 'link1',
  label: 'link1',
  title: null,
  url: 'https://example.com/link1',
  position: {
    start: {
      line: 7,
      column: 1,
      offset: 66,
    },
    end: {
      line: 7,
      column: 35,
      offset: 100,
    },
  },
};

const definition3 = {
  type: 'definition',
  identifier: 'common',
  label: 'common',
  title: null,
  url: 'https://example.com/common',
  position: {
    start: {
      line: 12,
      column: 1,
      offset: 126,
    },
    end: {
      line: 12,
      column: 37,
      offset: 162,
    },
  },
};

const refDefHandler = new ReferenceDefinitionHandler()
  .push(imageReference1)
  .push(imageReference2)
  .push(linkReference1)
  .push(linkReference2)
  .push(definition1)
  .push(definition2)
  .push(definition3);

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
  describe('push()', () => {
    it('should push nodes to the list correctly', () => {
      deepStrictEqual(refDefHandler.imageReferences, [imageReference1, imageReference2]);
      deepStrictEqual(refDefHandler.linkReferences, [linkReference1, linkReference2]);
      deepStrictEqual(refDefHandler.definitions, [definition1, definition2, definition3]);
    });
  });

  describe('isImageDefinition()', () => {
    it('should return true for image definitions', () => {
      strictEqual(refDefHandler.isImageDefinition(definition1), true);
      strictEqual(refDefHandler.isImageDefinition(definition2), false);
      strictEqual(refDefHandler.isImageDefinition(definition3), true);
    });
  });

  describe('isLinkDefinition()', () => {
    it('should return true for link definitions', () => {
      strictEqual(refDefHandler.isLinkDefinition(definition1), false);
      strictEqual(refDefHandler.isLinkDefinition(definition2), true);
      strictEqual(refDefHandler.isLinkDefinition(definition3), true);
    });
  });

  describe('getImageDefinitions()', () => {
    it('should return image definitions', () => {
      deepStrictEqual(refDefHandler.getImageDefinitions(), [definition1, definition3]);
    });
  });

  describe('getLinkDefinitions()', () => {
    it('should return link definitions', () => {
      deepStrictEqual(refDefHandler.getLinkDefinitions(), [definition2, definition3]);
    });
  });
});
