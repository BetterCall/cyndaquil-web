/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateFromContractInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GenerateFromContractMutation
// ====================================================

export interface GenerateFromContractMutation_generateFromContract {
  __typename: "GenerateFromContractOutput";
  id: number | null;
  ok: boolean | null;
  error: string | null;
}

export interface GenerateFromContractMutation {
  generateFromContract: GenerateFromContractMutation_generateFromContract;
}

export interface GenerateFromContractMutationVariables {
  input: GenerateFromContractInput;
}
