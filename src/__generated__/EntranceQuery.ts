/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EntranceQuery
// ====================================================

export interface EntranceQuery_entrance_result_floors {
  __typename: "Floor";
  id: number;
  name: string;
}

export interface EntranceQuery_entrance_result {
  __typename: "Entrance";
  id: number;
  name: string;
  floors: EntranceQuery_entrance_result_floors[];
}

export interface EntranceQuery_entrance {
  __typename: "EntranceOutput";
  ok: boolean;
  error: string | null;
  result: EntranceQuery_entrance_result | null;
}

export interface EntranceQuery {
  entrance: EntranceQuery_entrance;
}

export interface EntranceQueryVariables {
  id: number;
}
