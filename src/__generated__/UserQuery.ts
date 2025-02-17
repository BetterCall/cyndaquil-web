/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_user_result {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface UserQuery_user {
  __typename: "UserOutput";
  ok: boolean | null;
  error: string | null;
  result: UserQuery_user_result | null;
}

export interface UserQuery {
  user: UserQuery_user;
}

export interface UserQueryVariables {
  id: number;
}
