/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SiteFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SitesQuery
// ====================================================

export interface SitesQuery_sites_results_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface SitesQuery_sites_results_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: SitesQuery_sites_results_customer_category | null;
}

export interface SitesQuery_sites_results {
  __typename: "Site";
  id: number;
  name: string;
  completed: boolean;
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  customerId: number | null;
  customer: SitesQuery_sites_results_customer | null;
}

export interface SitesQuery_sites {
  __typename: "SitesOutput";
  hasMore: boolean | null;
  results: SitesQuery_sites_results[] | null;
}

export interface SitesQuery {
  sites: SitesQuery_sites;
}

export interface SitesQueryVariables {
  limit: number;
  offset: number;
  where: SiteFiltersInput;
}
