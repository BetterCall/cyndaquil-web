/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateContractInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateContractMutation
// ====================================================

export interface UpdateContractMutation_updateContract {
  __typename: "UpdateContractOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateContractMutation {
  updateContract: UpdateContractMutation_updateContract;
}

export interface UpdateContractMutationVariables {
  id: number;
  input: UpdateContractInput;
}
