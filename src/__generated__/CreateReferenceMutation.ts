/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReferenceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReferenceMutation
// ====================================================

export interface CreateReferenceMutation_createReference {
  __typename: "CreateReferenceOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateReferenceMutation {
  createReference: CreateReferenceMutation_createReference;
}

export interface CreateReferenceMutationVariables {
  input: CreateReferenceInput;
}
