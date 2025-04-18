/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type {
  MarkdownRuleDefinition,
  MarkdownRuleDefinitionTypeOptions,
} from '@eslint/markdown/types';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

export type RuleModuleTypeOptions = Omit<
  MarkdownRuleDefinitionTypeOptions,
  'ExtRuleDocs'
>;

export type RuleModule<Options extends Partial<RuleModuleTypeOptions> = object> =
  MarkdownRuleDefinition<
    Options & {
      ExtRuleDocs: {
        /**
         * Indicates whether this rule is part of the strict configuration.
         */
        strict?: boolean | RuleModuleTypeOptions['RuleOptions'];
        /**
         * Indicates whether this rule is part of the style configuration.
         */
        style?: boolean | RuleModuleTypeOptions['RuleOptions'];
        /**
         * Indicates whether this rule is part of the typography configuration.
         */
        typography?: boolean | RuleModuleTypeOptions['RuleOptions'];
      };
    }
  >;
