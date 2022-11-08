/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BugStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: BugQuery
// ====================================================

export interface BugQuery_bug_result_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface BugQuery_bug_result {
  __typename: "Bug";
  id: number;
  url: string;
  description: string | null;
  status: BugStatus;
  user: BugQuery_bug_result_user | null;
}

export interface BugQuery_bug {
  __typename: "BugOutput";
  ok: boolean | null;
  error: string | null;
  result: BugQuery_bug_result | null;
}

export interface BugQuery {
  bug: BugQuery_bug;
}

export interface BugQueryVariables {
  id: number;
}
