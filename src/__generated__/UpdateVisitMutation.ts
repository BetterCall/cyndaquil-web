/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateVisitInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVisitMutation
// ====================================================

export interface UpdateVisitMutation_updateVisit {
  __typename: "UpdateVisitOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateVisitMutation {
  updateVisit: UpdateVisitMutation_updateVisit;
}

export interface UpdateVisitMutationVariables {
  id: number;
  input: UpdateVisitInput;
}
