/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EmplacementQuery
// ====================================================

export interface EmplacementQuery_emplacement_result_category {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface EmplacementQuery_emplacement_result_site_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface EmplacementQuery_emplacement_result_site {
  __typename: "Site";
  id: number;
  name: string;
  city: string;
  postal: string;
  streetNumber: string;
  street: string;
  customerId: number | null;
  customer: EmplacementQuery_emplacement_result_site_customer | null;
}

export interface EmplacementQuery_emplacement_result {
  __typename: "Emplacement";
  id: number;
  code: number | null;
  informations: string;
  building: string;
  entrance: string | null;
  floor: number;
  categoryId: number | null;
  category: EmplacementQuery_emplacement_result_category | null;
  siteId: number | null;
  site: EmplacementQuery_emplacement_result_site | null;
}

export interface EmplacementQuery_emplacement {
  __typename: "EmplacementOutput";
  ok: boolean | null;
  error: string | null;
  result: EmplacementQuery_emplacement_result | null;
}

export interface EmplacementQuery {
  emplacement: EmplacementQuery_emplacement;
}

export interface EmplacementQueryVariables {
  id: number;
}
