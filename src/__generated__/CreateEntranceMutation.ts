/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEntranceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEntranceMutation
// ====================================================

export interface CreateEntranceMutation_createEntrance {
  __typename: "CreateEntranceOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface CreateEntranceMutation {
  createEntrance: CreateEntranceMutation_createEntrance;
}

export interface CreateEntranceMutationVariables {
  input: CreateEntranceInput;
}
