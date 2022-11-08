/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePriceRuleInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePriceRuleMutation
// ====================================================

export interface UpdatePriceRuleMutation_updatePriceRule {
  __typename: "UpdatePriceRuleOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdatePriceRuleMutation {
  updatePriceRule: UpdatePriceRuleMutation_updatePriceRule;
}

export interface UpdatePriceRuleMutationVariables {
  id: number;
  input: UpdatePriceRuleInput;
}
