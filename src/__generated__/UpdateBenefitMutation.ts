/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBenefitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBenefitMutation
// ====================================================

export interface UpdateBenefitMutation_updateBenefit {
  __typename: "UpdateBenefitOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateBenefitMutation {
  updateBenefit: UpdateBenefitMutation_updateBenefit;
}

export interface UpdateBenefitMutationVariables {
  id: number;
  input: UpdateBenefitInput;
}
