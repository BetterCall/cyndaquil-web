/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEquipmentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEquipmentMutation
// ====================================================

export interface CreateEquipmentMutation_createEquipment {
  __typename: "CreateEquipmentOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateEquipmentMutation {
  createEquipment: CreateEquipmentMutation_createEquipment;
}

export interface CreateEquipmentMutationVariables {
  input: CreateEquipmentInput;
}
