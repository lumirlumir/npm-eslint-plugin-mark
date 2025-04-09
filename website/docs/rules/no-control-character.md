<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

::: info

Carriage return(`\r`), line feed(`\n`) and tab(`\t`) are not reported by this rule.

:::

This rule is aimed at identifying and preventing the use of control characters in Markdown documents. Control characters are non-printing characters primarily used to control the interpretation or display of text, and they can cause issues with Markdown parsers, create inconsistencies in document formatting, and lead to potential rendering problems across different platforms.

The rule helps ensure that no unexpected control characters are present in your Markdown documents, which improves document consistency and prevents potential parsing problems. Control characters can be accidentally introduced when copying content from different sources or through certain keyboard shortcuts and can be difficult to detect visually.

This rule disallows the following control characters except where the options allow:

```txt
\u0000 - Null - <NUL>
\u0001 - Start of Heading - <SOH>
\u0002 - Start of Text - <STX>
\u0003 - End of Text - <ETX>
\u0004 - End of Transmission - <EOT>
\u0005 - Enquiry - <ENQ>
\u0006 - Acknowledge - <ACK>
\u0007 - Bell - <BEL>
\u0008 - Backspace - <BS>
\u000b - Line Tabulation - <VT>
\u000c - Form Feed - <FF>
\u000e - Shift Out - <SO>
\u000f - Shift In - <SI>
\u0010 - Data Link Escape - <DLE>
\u0011 - Device Control One - <DC1>
\u0012 - Device Control Two - <DC2>
\u0013 - Device Control Three - <DC3>
\u0014 - Device Control Four - <DC4>
\u0015 - Negative Acknowledge - <NAK>
\u0016 - Synchronous Idle - <SYN>
\u0017 - End of Transmission Block - <ETB>
\u0018 - Cancel - <CAN>
\u0019 - End of Medium - <EM>
\u001a - Substitute - <SUB>
\u001b - Escape - <ESC>
\u001c - Information Separator Four - <FS>
\u001d - Information Separator Three - <GS>
\u001e - Information Separator Two - <RS>
\u001f - Information Separator One - <US>
\u007f - Delete - <DEL>
\u0080 - Padding Character - <PAD>
\u0081 - High Octet Preset - <HOP>
\u0082 - Break Permitted Here - <BPH>
\u0083 - No Break Here - <NBH>
\u0084 - Index - <IND>
\u0085 - Next Line - <NEL>
\u0086 - Start of Selected Area - <SSA>
\u0087 - End of Selected Area - <ESA>
\u0088 - Character Tabulation Set - <HTS>
\u0089 - Character Tabulation with Justification - <HTJ>
\u008a - Line Tabulation Set - <VTS>
\u008b - Partial Line Forward - <PLD>
\u008c - Partial Line Backward - <PLU>
\u008d - Reverse Line Feed - <RI>
\u008e - Single Shift Two - <SS2>
\u008f - Single Shift Three - <SS3>
\u0090 - Device Control String - <DCS>
\u0091 - Private Use One - <PU1>
\u0092 - Private Use Two - <PU2>
\u0093 - Set Transmit State - <STS>
\u0094 - Cancel Character - <CCH>
\u0095 - Message Waiting - <MW>
\u0096 - Start of Guarded Area - <SPA>
\u0097 - End of Guarded Area - <EPA>
\u0098 - Start of String - <SOS>
\u0099 - Single Graphic Character Introducer - <SGCI>
\u009a - Single Character Introducer - <SCI>
\u009b - Control Sequence Introducer - <CSI>
\u009c - String Terminator - <ST>
\u009d - Operating System Command - <OSC>
\u009e - Privacy Message - <PM>
\u009f - Application Program Command - <APC>
\u202c - Pop Directional Formatting - <POPDF>
\u202d - Left-to-Right Override - <LRO>
\u202e - Right-to-Left Override - <RLO>
```

## Options

```js
'mark/no-control-character': ['error', {
  skipCode: true,
  skipInlineCode: true,
}]
```

### `skipCode`

> Default: `true`

`true` allows any control characters in code blocks.

### `skipInlineCode`

> Default: `true`

`true` allows any control characters in inline code.

## When Not To Use It

You might want to disable this rule if you're working with documents that intentionally contain control characters for specific purposes, such as demonstrating control character behavior or working with specialized text formats.

## AST

This rule applies to the entire document, specifically to the [`Root`](https://github.com/syntax-tree/mdast?tab=readme-ov-file#root) node.

## Prior Art

- [`textlint-rule-no-invalid-control-character`](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character)
- [`eslint/no-control-regex`](https://eslint.org/docs/latest/rules/no-control-regex)
