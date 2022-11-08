/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FloorReordered } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ReorderFloorsMutation
// ====================================================

export interface ReorderFloorsMutation_reorderFloors {
  __typename: "ReorderFloorOutput";
  ok: boolean | null;
  error: string | null;
}

export interface ReorderFloorsMutation {
  reorderFloors: ReorderFloorsMutation_reorderFloors;
}

export interface ReorderFloorsMutationVariables {
  floors?: FloorReordered[] | null;
}
