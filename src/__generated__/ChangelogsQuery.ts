/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangelogFiltersInput, Database, Event } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChangelogsQuery
// ====================================================

export interface ChangelogsQuery_changelogs_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface ChangelogsQuery_changelogs_results {
  __typename: "Changelog";
  id: number;
  database: Database;
  objectId: number;
  changes: any;
  important: boolean;
  event: Event;
  userId: number | null;
  user: ChangelogsQuery_changelogs_results_user;
}

export interface ChangelogsQuery_changelogs {
  __typename: "ChangelogsOutput";
  hasMore: boolean | null;
  results: ChangelogsQuery_changelogs_results[] | null;
}

export interface ChangelogsQuery {
  changelogs: ChangelogsQuery_changelogs;
}

export interface ChangelogsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: ChangelogFiltersInput;
}
