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

export type RuleContext = Parameters<MarkdownRuleDefinition['create']>[0];

export type RuleModule<
  RuleOptions extends MarkdownRuleDefinitionTypeOptions['RuleOptions'],
  MessageIds extends MarkdownRuleDefinitionTypeOptions['MessageIds'],
> = MarkdownRuleDefinition<{
  RuleOptions: RuleOptions;
  MessageIds: MessageIds;
  ExtRuleDocs: Partial<{
    /**
     * Indicates whether this rule is part of the strict configuration.
     */
    strict: boolean;

    /**
     * Indicates whether this rule is part of the style configuration.
     */
    style: boolean;

    /**
     * Indicates whether this rule is part of the typography configuration.
     */
    typography: boolean;
  }>;
}>;
