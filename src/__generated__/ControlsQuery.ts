/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ControlFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ControlsQuery
// ====================================================

export interface ControlsQuery_controls_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface ControlsQuery_controls_results {
  __typename: "Control";
  id: number;
  userId: number;
  user: ControlsQuery_controls_results_user;
  createdAt: any;
}

export interface ControlsQuery_controls {
  __typename: "ControlsOutput";
  hasMore: boolean | null;
  results: ControlsQuery_controls_results[] | null;
}

export interface ControlsQuery {
  controls: ControlsQuery_controls;
}

export interface ControlsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: ControlFiltersInput;
}
