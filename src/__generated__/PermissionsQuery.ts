/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: PermissionsQuery
// ====================================================

export interface PermissionsQuery_permissions_results_users_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface PermissionsQuery_permissions_results_users {
  __typename: "UserPermission";
  id: number;
  active: boolean;
  userId: number;
  user: PermissionsQuery_permissions_results_users_user;
}

export interface PermissionsQuery_permissions_results {
  __typename: "Permission";
  id: number;
  resource: string;
  action: string;
  label: string;
  roles: UserRole[];
  users: PermissionsQuery_permissions_results_users[];
}

export interface PermissionsQuery_permissions {
  __typename: "PermissionsOutput";
  ok: boolean | null;
  results: PermissionsQuery_permissions_results[] | null;
}

export interface PermissionsQuery {
  permissions: PermissionsQuery_permissions;
}
