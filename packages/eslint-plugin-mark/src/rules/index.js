/* eslint sort-imports: 'error', sort-keys: 'error' */

import allowedHeading from './allowed-heading/index.js';
import altText from './alt-text/index.js';
import codeLangShorthand from './code-lang-shorthand/index.js';
import enCapitalization from './en-capitalization/index.js';
import headingId from './heading-id/index.js';
import imageTitle from './image-title/index.js';
import noBoldParagraph from './no-bold-paragraph/index.js';
import noControlCharacter from './no-control-character/index.js';
import noCurlyQuote from './no-curly-quote/index.js';
import noDoubleSpace from './no-double-space/index.js';
import noEmoji from './no-emoji/index.js';
import noGitConflictMarker from './no-git-conflict-marker/index.js';
import noIrregularDash from './no-irregular-dash/index.js';
import noIrregularWhitespace from './no-irregular-whitespace/index.js';
import noUnusedDefinition from './no-unused-definition/index.js';

export default {
  'allowed-heading': allowedHeading,
  'alt-text': altText,
  'code-lang-shorthand': codeLangShorthand,
  'en-capitalization': enCapitalization,
  'heading-id': headingId,
  'image-title': imageTitle,
  'no-bold-paragraph': noBoldParagraph,
  'no-control-character': noControlCharacter,
  'no-curly-quote': noCurlyQuote,
  'no-double-space': noDoubleSpace,
  'no-emoji': noEmoji,
  'no-git-conflict-marker': noGitConflictMarker,
  'no-irregular-dash': noIrregularDash,
  'no-irregular-whitespace': noIrregularWhitespace,
  'no-unused-definition': noUnusedDefinition,
};
