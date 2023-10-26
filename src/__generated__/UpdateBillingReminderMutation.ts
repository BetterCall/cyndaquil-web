/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBillingReminderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBillingReminderMutation
// ====================================================

export interface UpdateBillingReminderMutation_updateBillingReminder {
  __typename: "UpdateBillingReminderOutput";
  ok: boolean | null;
  error: string | null;
}

export interface UpdateBillingReminderMutation {
  updateBillingReminder: UpdateBillingReminderMutation_updateBillingReminder;
}

export interface UpdateBillingReminderMutationVariables {
  id: number;
  input: UpdateBillingReminderInput;
}
