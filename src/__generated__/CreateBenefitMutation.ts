/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBenefitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBenefitMutation
// ====================================================

export interface CreateBenefitMutation_createBenefit {
  __typename: "CreateBenefitOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateBenefitMutation {
  createBenefit: CreateBenefitMutation_createBenefit;
}

export interface CreateBenefitMutationVariables {
  input: CreateBenefitInput;
}
