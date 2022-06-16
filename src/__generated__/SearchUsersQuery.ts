/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserFiltersInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchUsersQuery
// ====================================================

export interface SearchUsersQuery_searchUsers_results {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}

export interface SearchUsersQuery_searchUsers {
  __typename: "UsersOutput";
  hasMore: boolean | null;
  results: SearchUsersQuery_searchUsers_results[] | null;
}

export interface SearchUsersQuery {
  searchUsers: SearchUsersQuery_searchUsers;
}

export interface SearchUsersQueryVariables {
  limit: number;
  offset: number;
  where: UserFiltersInput;
}
