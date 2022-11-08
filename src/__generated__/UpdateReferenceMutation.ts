/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateReferenceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReferenceMutation
// ====================================================

export interface UpdateReferenceMutation_updateReference {
  __typename: "UpdateReferenceOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateReferenceMutation {
  updateReference: UpdateReferenceMutation_updateReference;
}

export interface UpdateReferenceMutationVariables {
  id: number;
  input: UpdateReferenceInput;
}
