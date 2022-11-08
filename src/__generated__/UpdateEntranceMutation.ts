/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEntranceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEntranceMutation
// ====================================================

export interface UpdateEntranceMutation_updateEntrance {
  __typename: "UpdateEntranceOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateEntranceMutation {
  updateEntrance: UpdateEntranceMutation_updateEntrance;
}

export interface UpdateEntranceMutationVariables {
  id: number;
  input: UpdateEntranceInput;
}
