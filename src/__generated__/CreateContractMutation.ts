/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateContractInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateContractMutation
// ====================================================

export interface CreateContractMutation_createContract {
  __typename: "CreateContractOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateContractMutation {
  createContract: CreateContractMutation_createContract;
}

export interface CreateContractMutationVariables {
  input: CreateContractInput;
}
