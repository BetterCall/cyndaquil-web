/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateVisitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVisitMutation
// ====================================================

export interface CreateVisitMutation_createVisit {
  __typename: "CreateVisitOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateVisitMutation {
  createVisit: CreateVisitMutation_createVisit;
}

export interface CreateVisitMutationVariables {
  input: CreateVisitInput;
}
