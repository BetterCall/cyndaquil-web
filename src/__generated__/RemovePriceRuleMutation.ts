/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemovePriceRuleMutation
// ====================================================

export interface RemovePriceRuleMutation_removePriceRule {
  __typename: "RemovePriceRuleOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemovePriceRuleMutation {
  removePriceRule: RemovePriceRuleMutation_removePriceRule;
}

export interface RemovePriceRuleMutationVariables {
  id: number;
}
