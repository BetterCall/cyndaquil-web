/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveBenefitMutation
// ====================================================

export interface RemoveBenefitMutation_removeBenefit {
  __typename: "RemoveBenefitOutput";
  ok: boolean | null;
  error: string | null;
}

export interface RemoveBenefitMutation {
  removeBenefit: RemoveBenefitMutation_removeBenefit;
}

export interface RemoveBenefitMutationVariables {
  id: number;
}
