/**
 * @fileoverview `TextHandler` transforms a `Text` node into a `TextExt` node by adding a `children` property.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * @typedef {import("../../types.d.ts").TextExt} TextExt
 * @typedef {import("../../types.d.ts").TextLine} TextLine
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const newLineRegex = /\r?\n/;
const indexOffset = 1; // `index` is 0-based, but `column` is 1-based.

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `TextHandler` transforms a `Text` node into a `TextExt` node by adding a `children` property.
 * During this process, it splits the text into multiple lines and creates `TextLine` nodes for each line.
 * The generated `TextLine` nodes then become child elements of the `Text` node.
 *
 * - NOTE: This function is designed to create **SIDE EFFECTS** by modifying the original `Text` node.
 *
 * @param {RuleContext} context `import("eslint").Rule.RuleContext`
 * @param {TextExt} textNode
 */
export default function textHandler(context, textNode) {
  textNode.children = [];

  /**
   * - Supports both LF and CRLF line endings.
   * - In JavaScript, `\n` represents a newline character and splits text accordingly.
   *   However, in Markdown, writing `abcd\ndefg` treats `\n` as plain text (backslash + 'n'), not a newline.
   *   Only actual line breaks in Markdown (`abcd↵defg`) are stored as `"\n"` and split properly.
   */ // @ts-ignore -- TODO: https://github.com/eslint/markdown/issues/323
  const lines = context.sourceCode.getText(textNode).split(newLineRegex);

  lines.forEach((line, lineNumber) => {
    const locLine = textNode.position.start.line + lineNumber;
    const locColumn = lineNumber === 0 ? textNode.position.start.column : indexOffset;
    let locOffset = textNode.position.start.offset;

    for (let i = 0; i < lineNumber; i++) {
      locOffset += lines[i].length + 1; // Add the lengths of previous lines. (`+1` for the newline character.)
    }

    textNode.children.push(
      /** @type {TextLine} */ {
        type: 'textLine',
        value: line,
        position: {
          start: {
            line: locLine,
            column: locColumn,
            offset: locOffset,
          },
          end: {
            line: locLine,
            column: locColumn + line.length,
            offset: locOffset + line.length,
          },
        },
      },
    );
  });
}
