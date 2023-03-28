/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePermissionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePermissionMutation
// ====================================================

export interface UpdatePermissionMutation_updatePermission {
  __typename: "UpdatePermissionOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdatePermissionMutation {
  updatePermission: UpdatePermissionMutation_updatePermission;
}

export interface UpdatePermissionMutationVariables {
  id: number;
  input: UpdatePermissionInput;
}
