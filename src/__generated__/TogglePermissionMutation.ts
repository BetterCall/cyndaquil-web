/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: TogglePermissionMutation
// ====================================================

export interface TogglePermissionMutation {
  togglePermission: boolean;
}

export interface TogglePermissionMutationVariables {
  permissionId: number;
  userId?: number | null;
  userRole?: UserRole | null;
}
