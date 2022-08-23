/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BugStatus {
  Pending = "Pending",
  Resolved = "Resolved",
}

export enum ContractStatus {
  Accepted = "Accepted",
  Declined = "Declined",
  Draft = "Draft",
  Pending = "Pending",
}

export enum FloorType {
  Basement = "Basement",
  Stage = "Stage",
}

export enum UserRole {
  Admin = "Admin",
  Client = "Client",
  Employee = "Employee",
}

export enum WorkOrderStatus {
  Accepted = "Accepted",
  Declined = "Declined",
  Pending = "Pending",
}

export interface BugFiltersInput {
  userId?: number | null;
  state?: string | null;
}

export interface CallsFiltersInput {
  userId?: number | null;
  customerId?: number | null;
  siteId?: number | null;
}

export interface ContactFiltersInput {
  search?: string | null;
  customerId?: number | null;
  siteId?: number | null;
  city?: string | null;
  postal?: string | null;
}

export interface ContractFiltersInput {
  search?: string | null;
  siteId?: number | null;
  customerId?: number | null;
  status?: ContractStatus | null;
}

export interface CreateBugInput {
  url: string;
  description?: string | null;
}

export interface CreateBuildingInput {
  name: string;
  siteId: number;
}

export interface CreateCallInput {
  additionalInformations: string;
  customerId?: number | null;
  siteId?: number | null;
  contactId?: number | null;
}

export interface CreateContactInput {
  firstname: string;
  lastname: string;
  phone?: string | null;
  email?: string | null;
  customerId?: number | null;
  siteId?: number | null;
}

export interface CreateCustomerCategoryInput {
  name: string;
}

export interface CreateCustomerInput {
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  name: string;
  email?: string | null;
  phone: string;
  categoryId: number;
}

export interface CreateEmplacementInput {
  informations: string;
  categoryId: number;
  floorId: number;
}

export interface CreateEntranceInput {
  name: string;
  buildingId: number;
  stagesCount?: number | null;
  basementsCount?: number | null;
}

export interface CreateEquipmentCategoryInput {
  name: string;
}

export interface CreateSiteInput {
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  name: string;
  customerId?: number | null;
}

export interface CreateWorkOrderInput {
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  name: string;
  additionalInformations?: string | null;
  customerId?: number | null;
  siteId?: number | null;
}

export interface CustomerFiltersInput {
  search?: string | null;
  categoryId?: number | null;
  city?: string | null;
  postal?: string | null;
}

export interface EditBugInput {
  description?: string | null;
  url?: string | null;
  status?: BugStatus | null;
}

export interface EditBuildingInput {
  name?: string | null;
  siteId?: number | null;
}

export interface EditCallInput {
  additionalInformations?: string | null;
  customerId?: number | null;
  siteId?: number | null;
  contactId?: number | null;
}

export interface EditContactInput {
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface EditCustomerCategoryInput {
  name?: string | null;
  hidden?: boolean | null;
}

export interface EditCustomerInput {
  lat?: number | null;
  lng?: number | null;
  streetNumber?: string | null;
  street?: string | null;
  postal?: string | null;
  city?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  categoryId?: number | null;
  hidden?: boolean | null;
}

export interface EditEquipmentCategoryInput {
  name?: string | null;
}

export interface EditSiteInput {
  lat?: number | null;
  lng?: number | null;
  streetNumber?: string | null;
  street?: string | null;
  postal?: string | null;
  city?: string | null;
  name?: string | null;
  customerId?: number | null;
}

export interface EditUserInput {
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface EditWorkOrderInput {
  lat?: number | null;
  lng?: number | null;
  streetNumber?: string | null;
  street?: string | null;
  postal?: string | null;
  city?: string | null;
  name?: string | null;
  additionalInformations?: string | null;
  customerId?: number | null;
  siteId?: number | null;
}

export interface FloorReordered {
  id: number;
  order: number;
}

export interface GenerateContractInput {
  name: string;
  emplacementIds: number[];
  siteId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SiteFiltersInput {
  search?: string | null;
  customerId?: number | null;
  city?: string | null;
  postal?: string | null;
}

export interface UserFiltersInput {
  search?: string | null;
  role?: UserRole | null;
}

export interface WorkOrderFiltersInput {
  search?: string | null;
  siteId?: number | null;
  customerId?: number | null;
  status?: WorkOrderStatus | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
