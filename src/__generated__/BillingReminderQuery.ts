/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BillingReminderQuery
// ====================================================

export interface BillingReminderQuery_billingReminder_result_madeBy {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface BillingReminderQuery_billingReminder_result_invoice {
  __typename: "Invoice";
  id: number;
}

export interface BillingReminderQuery_billingReminder_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface BillingReminderQuery_billingReminder_result_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface BillingReminderQuery_billingReminder_result_contact {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
}

export interface BillingReminderQuery_billingReminder_result {
  __typename: "BillingReminder";
  id: number;
  madeById: number | null;
  madeBy: BillingReminderQuery_billingReminder_result_madeBy;
  invoiceId: number | null;
  invoice: BillingReminderQuery_billingReminder_result_invoice;
  customerId: number | null;
  customer: BillingReminderQuery_billingReminder_result_customer | null;
  siteId: number | null;
  site: BillingReminderQuery_billingReminder_result_site | null;
  contactId: number | null;
  contact: BillingReminderQuery_billingReminder_result_contact;
}

export interface BillingReminderQuery_billingReminder {
  __typename: "BillingReminderOutput";
  ok: boolean | null;
  error: string | null;
  result: BillingReminderQuery_billingReminder_result | null;
}

export interface BillingReminderQuery {
  billingReminder: BillingReminderQuery_billingReminder;
}

export interface BillingReminderQueryVariables {
  id: number;
}
