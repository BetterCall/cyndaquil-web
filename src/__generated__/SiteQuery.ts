/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteQuery
// ====================================================

export interface SiteQuery_site_result_customer_commercial {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface SiteQuery_site_result_customer_category {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface SiteQuery_site_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
  email: string | null;
  phone: string;
  commercialId: number | null;
  commercial: SiteQuery_site_result_customer_commercial | null;
  sitesCount: number;
  category: SiteQuery_site_result_customer_category | null;
}

export interface SiteQuery_site_result_manager {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
  email: string | null;
  phone: string | null;
  sitesCount: number;
}

export interface SiteQuery_site_result_contacts {
  __typename: "Contact";
  id: number;
  firstname: string;
  lastname: string;
  email: string | null;
  phone: string | null;
}

export interface SiteQuery_site_result {
  __typename: "Site";
  id: number;
  buildingsCount: number;
  entrancesCount: number;
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
  managerId: number | null;
  manager: SiteQuery_site_result_manager | null;
  contacts: SiteQuery_site_result_contacts[];
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
