/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Database, Event } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChangelogQuery
// ====================================================

export interface ChangelogQuery_changelog_result_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface ChangelogQuery_changelog_result {
  __typename: "Changelog";
  id: number;
  database: Database;
  objectId: number;
  changes: any;
  important: boolean;
  event: Event;
  userId: number | null;
  user: ChangelogQuery_changelog_result_user;
}

export interface ChangelogQuery_changelog {
  __typename: "ChangelogOutput";
  ok: boolean | null;
  error: string | null;
  result: ChangelogQuery_changelog_result | null;
}

export interface ChangelogQuery {
  changelog: ChangelogQuery_changelog;
}

export interface ChangelogQueryVariables {
  id: number;
}
