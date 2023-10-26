/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: CustomersQuery
// ====================================================

export interface CustomersQuery_customers_results_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface CustomersQuery_customers_results {
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
  category: CustomersQuery_customers_results_category | null;
}

export interface CustomersQuery_customers {
  __typename: "CustomersOutput";
  hasMore: boolean | null;
  total: number | null;
  results: CustomersQuery_customers_results[] | null;
}

export interface CustomersQuery {
  customers: CustomersQuery_customers;
}

export interface CustomersQueryVariables {
  limit: number;
  offset: number;
  where: CustomerFiltersInput;
}
