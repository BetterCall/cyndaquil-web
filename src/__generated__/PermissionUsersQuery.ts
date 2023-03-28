/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PermissionUsersQuery
// ====================================================

export interface PermissionUsersQuery_userPermissions_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface PermissionUsersQuery_userPermissions_results {
  __typename: "UserPermission";
  id: number;
  user: PermissionUsersQuery_userPermissions_results_user;
}

export interface PermissionUsersQuery_userPermissions {
  __typename: "PermissionUsersOutput";
  ok: boolean | null;
  results: PermissionUsersQuery_userPermissions_results[] | null;
}

export interface PermissionUsersQuery {
  userPermissions: PermissionUsersQuery_userPermissions;
}

export interface PermissionUsersQueryVariables {
  permissionsId: number;
}
