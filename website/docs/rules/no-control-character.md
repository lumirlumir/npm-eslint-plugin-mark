<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

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

Carriage return(`\r`), line feed(`\n`) and tab(`\t`) are not considered control characters in this rule.

## Prior Art

- [`textlint-rule-no-invalid-control-chracter](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character)
- [`eslint/no-control-regex`](https://eslint.org/docs/latest/rules/no-control-regex)
