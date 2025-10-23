/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type {
  MarkdownRuleDefinition,
  MarkdownRuleDefinitionTypeOptions,
} from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

export type ParserMode = 'commonmark' | 'gfm';

export type RuleModule<
  RuleOptions extends MarkdownRuleDefinitionTypeOptions['RuleOptions'],
  MessageIds extends MarkdownRuleDefinitionTypeOptions['MessageIds'],
> = MarkdownRuleDefinition<{
  RuleOptions: RuleOptions;
  MessageIds: MessageIds;
  ExtRuleDocs: Partial<{
    /**
     * Indicates whether this rule is part of the stylistic configuration.
     */
    stylistic: boolean;
  }>;
}>;
