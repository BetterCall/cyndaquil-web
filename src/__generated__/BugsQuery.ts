/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BugFiltersInput, BugStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: BugsQuery
// ====================================================

export interface BugsQuery_bugs_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface BugsQuery_bugs_results {
  __typename: "Bug";
  id: number;
  url: string;
  status: BugStatus;
  object: string;
  critical: boolean;
  user: BugsQuery_bugs_results_user | null;
}

export interface BugsQuery_bugs {
  __typename: "BugsOutput";
  hasMore: boolean | null;
  results: BugsQuery_bugs_results[] | null;
}

export interface BugsQuery {
  bugs: BugsQuery_bugs;
}

export interface BugsQueryVariables {
  limit: number;
  offset: number;
  where: BugFiltersInput;
}
