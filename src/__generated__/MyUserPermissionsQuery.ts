/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyUserPermissionsQuery
// ====================================================

export interface MyUserPermissionsQuery_myUserPermissions_results_permission {
  __typename: "Permission";
  id: number;
  resource: string;
  action: string;
  label: string;
}

export interface MyUserPermissionsQuery_myUserPermissions_results {
  __typename: "UserPermission";
  id: number;
  active: boolean;
  permission: MyUserPermissionsQuery_myUserPermissions_results_permission;
}

export interface MyUserPermissionsQuery_myUserPermissions {
  __typename: "PermissionUsersOutput";
  ok: boolean | null;
  results: MyUserPermissionsQuery_myUserPermissions_results[] | null;
}

export interface MyUserPermissionsQuery {
  myUserPermissions: MyUserPermissionsQuery_myUserPermissions;
}
