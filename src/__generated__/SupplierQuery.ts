/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SupplierQuery
// ====================================================

export interface SupplierQuery_supplier_result {
  __typename: "Supplier";
  id: number;
  name: string;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  lat: number;
  lng: number;
}

export interface SupplierQuery_supplier {
  __typename: "SupplierOutput";
  ok: boolean | null;
  error: string | null;
  result: SupplierQuery_supplier_result | null;
}

export interface SupplierQuery {
  supplier: SupplierQuery_supplier;
}

export interface SupplierQueryVariables {
  id: number;
}
