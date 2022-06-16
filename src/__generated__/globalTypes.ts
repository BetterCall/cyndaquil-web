/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Admin = "Admin",
  Client = "Client",
  Employee = "Employee",
}

export interface EditUserInput {
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserFiltersInput {
  search?: string | null;
  role?: UserRole | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
