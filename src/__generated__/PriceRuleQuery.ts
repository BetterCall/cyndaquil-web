/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PriceRuleType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PriceRuleQuery
// ====================================================

export interface PriceRuleQuery_priceRule_result_benefit {
  __typename: "Benefit";
  id: number;
  name: string;
}

export interface PriceRuleQuery_priceRule_result_customerCategory {
  __typename: "CustomerCategory";
  id: number;
  name: string;
}

export interface PriceRuleQuery_priceRule_result_equipmentCategory {
  __typename: "EquipmentCategory";
  id: number;
  name: string;
}

export interface PriceRuleQuery_priceRule_result_customer {
  __typename: "Customer";
  id: number;
  name: string;
}

export interface PriceRuleQuery_priceRule_result {
  __typename: "PriceRule";
  id: number;
  amount: number;
  type: PriceRuleType;
  description: string;
  benefit: PriceRuleQuery_priceRule_result_benefit | null;
  customerCategory: PriceRuleQuery_priceRule_result_customerCategory | null;
  equipmentCategory: PriceRuleQuery_priceRule_result_equipmentCategory | null;
  customer: PriceRuleQuery_priceRule_result_customer | null;
}

export interface PriceRuleQuery_priceRule {
  __typename: "PriceRuleOutput";
  ok: boolean | null;
  error: string | null;
  result: PriceRuleQuery_priceRule_result | null;
}

export interface PriceRuleQuery {
  priceRule: PriceRuleQuery_priceRule;
}

export interface PriceRuleQueryVariables {
  id: number;
}
