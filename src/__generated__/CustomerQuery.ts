/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerQuery
// ====================================================

export interface CustomerQuery_customer_result_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface CustomerQuery_customer_result_contacts {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
}

export interface CustomerQuery_customer_result {
  __typename: "Customer";
  id: number;
  name: string;
  email: string | null;
  phone: string;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  lat: number;
  lng: number;
  category: CustomerQuery_customer_result_category | null;
  contacts: CustomerQuery_customer_result_contacts[];
}

export interface CustomerQuery_customer {
  __typename: "CustomerOutput";
  ok: boolean | null;
  error: string | null;
  result: CustomerQuery_customer_result | null;
}

export interface CustomerQuery {
  customer: CustomerQuery_customer;
}

export interface CustomerQueryVariables {
  id: number;
}
