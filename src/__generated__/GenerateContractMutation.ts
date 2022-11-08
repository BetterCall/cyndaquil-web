/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateContractInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GenerateContractMutation
// ====================================================

export interface GenerateContractMutation_generateContract {
  __typename: "GenerateContractOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface GenerateContractMutation {
  generateContract: GenerateContractMutation_generateContract;
}

export interface GenerateContractMutationVariables {
  input: GenerateContractInput;
}
