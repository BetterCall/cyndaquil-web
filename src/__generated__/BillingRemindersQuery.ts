/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BillingRemindersFiltersInput, BillingReminderType } from "./globalTypes";

// ====================================================
// GraphQL query operation: BillingRemindersQuery
// ====================================================

export interface BillingRemindersQuery_billingReminders_results_madeBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface BillingRemindersQuery_billingReminders_results_invoice {
  __typename: "Invoice";
  id: number;
}

export interface BillingRemindersQuery_billingReminders_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface BillingRemindersQuery_billingReminders_results_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface BillingRemindersQuery_billingReminders_results_contact {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
}

export interface BillingRemindersQuery_billingReminders_results {
  __typename: "BillingReminder";
  id: number;
  type: BillingReminderType;
  madeById: number | null;
  madeBy: BillingRemindersQuery_billingReminders_results_madeBy;
  invoiceId: number | null;
  invoice: BillingRemindersQuery_billingReminders_results_invoice;
  customerId: number | null;
  customer: BillingRemindersQuery_billingReminders_results_customer | null;
  siteId: number | null;
  site: BillingRemindersQuery_billingReminders_results_site | null;
  contactId: number | null;
  contact: BillingRemindersQuery_billingReminders_results_contact;
}

export interface BillingRemindersQuery_billingReminders {
  __typename: "BillingRemindersOutput";
  hasMore: boolean | null;
  results: BillingRemindersQuery_billingReminders_results[] | null;
}

export interface BillingRemindersQuery {
  billingReminders: BillingRemindersQuery_billingReminders;
}

export interface BillingRemindersQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: BillingRemindersFiltersInput;
}
