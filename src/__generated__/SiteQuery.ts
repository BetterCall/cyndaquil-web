/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteQuery
// ====================================================

export interface SiteQuery_site_result_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface SiteQuery_site_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  category: SiteQuery_site_result_customer_category | null;
}

export interface SiteQuery_site_result_contacts {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
  email: string | null;
  phone: string | null;
}

export interface SiteQuery_site_result_buildings_entrances {
  __typename: "Entrance";
  id: number;
}

export interface SiteQuery_site_result_buildings {
  __typename: "Building";
  id: number;
  name: string;
  entrances: SiteQuery_site_result_buildings_entrances[];
}

export interface SiteQuery_site_result {
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
  customer: SiteQuery_site_result_customer | null;
  contacts: SiteQuery_site_result_contacts[];
  buildings: SiteQuery_site_result_buildings[];
}

export interface SiteQuery_site {
  __typename: "SiteOutput";
  ok: boolean | null;
  error: string | null;
  result: SiteQuery_site_result | null;
}

export interface SiteQuery {
  site: SiteQuery_site;
}

export interface SiteQueryVariables {
  id: number;
}
