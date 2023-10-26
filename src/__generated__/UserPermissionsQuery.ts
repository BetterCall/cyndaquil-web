/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserPermissionsQuery
// ====================================================

export interface UserPermissionsQuery_userPermissions_results_permission {
  __typename: "Permission";
  id: number;
  label: string;
}

export interface UserPermissionsQuery_userPermissions_results {
  __typename: "UserPermission";
  id: number;
  permissionId: number;
  permission: UserPermissionsQuery_userPermissions_results_permission;
}

export interface UserPermissionsQuery_userPermissions {
  __typename: "PermissionUsersOutput";
  ok: boolean | null;
  results: UserPermissionsQuery_userPermissions_results[] | null;
}

export interface UserPermissionsQuery {
  userPermissions: UserPermissionsQuery_userPermissions;
}

export interface UserPermissionsQueryVariables {
  userId: number;
}
