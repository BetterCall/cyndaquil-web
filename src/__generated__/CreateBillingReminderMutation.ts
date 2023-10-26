/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBillingReminderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBillingReminderMutation
// ====================================================

export interface CreateBillingReminderMutation_createBillingReminder {
  __typename: "CreateBillingReminderOutput";
  ok: boolean | null;
  error: string | null;
  id: number | null;
}

export interface CreateBillingReminderMutation {
  createBillingReminder: CreateBillingReminderMutation_createBillingReminder;
}

export interface CreateBillingReminderMutationVariables {
  input: CreateBillingReminderInput;
}
