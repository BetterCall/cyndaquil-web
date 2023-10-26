/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContactFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ContactsQuery
// ====================================================

export interface ContactsQuery_contacts_results_category {
  __typename: "ContactCategory";
  id: number;
  name: string;
}

export interface ContactsQuery_contacts_results_site {
  __typename: "Site";
  id: number;
  name: string;
}

export interface ContactsQuery_contacts_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface ContactsQuery_contacts_results {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
  phone: string | null;
  email: string | null;
  birthday: any | null;
  categoryId: number | null;
  category: ContactsQuery_contacts_results_category | null;
  siteId: number | null;
  site: ContactsQuery_contacts_results_site | null;
  customerId: number | null;
  customer: ContactsQuery_contacts_results_customer | null;
}

export interface ContactsQuery_contacts {
  __typename: "ContactsOutput";
  hasMore: boolean | null;
  total: number | null;
  results: ContactsQuery_contacts_results[] | null;
}

export interface ContactsQuery {
  contacts: ContactsQuery_contacts;
}

export interface ContactsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: ContactFiltersInput;
}
