/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePriceRuleInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePriceRuleMutation
// ====================================================

export interface CreatePriceRuleMutation_createPriceRule {
  __typename: "CreatePriceRuleOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreatePriceRuleMutation {
  createPriceRule: CreatePriceRuleMutation_createPriceRule;
}

export interface CreatePriceRuleMutationVariables {
  input: CreatePriceRuleInput;
}
