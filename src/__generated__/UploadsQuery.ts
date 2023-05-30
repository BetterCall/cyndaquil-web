/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UploadFiltersInput, Database } from "./globalTypes";

// ====================================================
// GraphQL query operation: UploadsQuery
// ====================================================

export interface UploadsQuery_uploads_results_user {
  __typename: "User";
  id: number;
  firstname: string;
  lastname: string;
}

export interface UploadsQuery_uploads_results {
  __typename: "Upload";
  id: number;
  database: Database;
  objectId: number;
  url: string;
  publicLink: string;
  thumbnailUrl: string;
  thumbnaiPublicLink: string;
  informations: string;
  categoryId: number | null;
  userId: number | null;
  user: UploadsQuery_uploads_results_user | null;
}

export interface UploadsQuery_uploads {
  __typename: "UploadsOutput";
  hasMore: boolean | null;
  results: UploadsQuery_uploads_results[] | null;
}

export interface UploadsQuery {
  uploads: UploadsQuery_uploads;
}

export interface UploadsQueryVariables {
  limit?: number | null;
  offset?: number | null;
  where: UploadFiltersInput;
}
