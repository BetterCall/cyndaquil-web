/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContactQuery
// ====================================================

export interface ContactQuery_contact_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  streetNumber: string;
  street: string;
  city: string;
  postal: string;
  lat: number;
  lng: number;
}

export interface ContactQuery_contact_result_site {
  __typename: "Site";
  id: number;
  name: string;
  streetNumber: string;
  street: string;
  city: string;
  postal: string;
  lat: number;
  lng: number;
}

export interface ContactQuery_contact_result {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
  phone: string | null;
  email: string | null;
  additionalInformations: string | null;
  customerId: number | null;
  customer: ContactQuery_contact_result_customer | null;
  siteId: number | null;
  site: ContactQuery_contact_result_site | null;
}

export interface ContactQuery_contact {
  __typename: "ContactOutput";
  ok: boolean | null;
  error: string | null;
  result: ContactQuery_contact_result | null;
}

export interface ContactQuery {
  contact: ContactQuery_contact;
}

export interface ContactQueryVariables {
  id: number;
}
