/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEquipmentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEquipmentMutation
// ====================================================

export interface UpdateEquipmentMutation_updateEquipment {
  __typename: "UpdateEquipmentOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateEquipmentMutation {
  updateEquipment: UpdateEquipmentMutation_updateEquipment;
}

export interface UpdateEquipmentMutationVariables {
  id: number;
  input: UpdateEquipmentInput;
}
