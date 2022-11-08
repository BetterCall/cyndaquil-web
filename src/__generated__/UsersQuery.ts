/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersFiltersInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: UsersQuery
// ====================================================

export interface UsersQuery_users_results {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}

export interface UsersQuery_users {
  __typename: "UsersOutput";
  hasMore: boolean | null;
  results: UsersQuery_users_results[] | null;
}

export interface UsersQuery {
  users: UsersQuery_users;
}

export interface UsersQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: UsersFiltersInput;
}
