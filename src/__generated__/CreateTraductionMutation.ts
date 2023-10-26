/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTraductionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTraductionMutation
// ====================================================

export interface CreateTraductionMutation_createTraduction {
  __typename: "CreateTraductionOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateTraductionMutation {
  createTraduction: CreateTraductionMutation_createTraduction;
}

export interface CreateTraductionMutationVariables {
  input: CreateTraductionInput;
}
