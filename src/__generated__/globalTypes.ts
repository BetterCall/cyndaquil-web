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

export enum PriceRuleType {
  Percent = "Percent",
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

export enum WorkOrderType {
  Control = "Control",
  Installation = "Installation",
  Other = "Other",
  Replacement = "Replacement",
  Study = "Study",
}

export interface BenefitFiltersInput {
  categoryId?: number | null;
}

export interface BrandsFiltersInput {
  search?: string | null;
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
  madeById?: number | null;
  siteId?: number | null;
  customerId?: number | null;
  status?: ContractStatus | null;
}

export interface CreateBenefitInput {
  name: string;
  price: number;
  categoryId: number;
}

export interface CreateBrandInput {
  name: string;
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

export interface CreateEquipmentInput {
  informations: string;
  categoryId: number;
}

export interface CreateFloorInput {
  name: string;
  type: FloorType;
  entranceId: number;
}

export interface CreatePriceRuleInput {
  amount: number;
  type: PriceRuleType;
  description: string;
  customerId: number;
  benefitId?: number | null;
  categoryId?: number | null;
}

export interface CreateReferenceInput {
  name: string;
  description?: string | null;
  brandId: number;
  categoryId: number;
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

export interface CreateSupplierInput {
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  name: string;
  description?: string | null;
}

export interface CreateWorkOrderInput {
  lat: number;
  lng: number;
  streetNumber: string;
  street: string;
  postal: string;
  city: string;
  name: string;
  description?: string | null;
  type: WorkOrderType;
  date?: string | null;
  start?: string | null;
  end?: string | null;
  customerId?: number | null;
  siteId?: number | null;
  userId?: number | null;
  emplacementIds?: number[] | null;
}

export interface CustomerFiltersInput {
  search?: string | null;
  categoryId?: number | null;
  city?: string | null;
  postal?: string | null;
}

export interface EquipmentFiltersInput {
  categoryId?: number | null;
}

export interface FloorReordered {
  id: number;
  order: number;
}

export interface GenerateContractInput {
  name: string;
  rows: RowsInput[];
  siteId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PriceRulesFiltersInput {
  benefitId?: number | null;
  customerId?: number | null;
}

export interface ReferencesFiltersInput {
  search?: string | null;
  brandId?: number | null;
  categoryId?: number | null;
}

export interface RowsInput {
  benefitId: number;
  emplacementId: number;
}

export interface SiteFiltersInput {
  search?: string | null;
  customerId?: number | null;
  city?: string | null;
  postal?: string | null;
}

export interface SuppliersFiltersInput {
  search?: string | null;
}

export interface UpdateBenefitInput {
  name?: string | null;
  price?: number | null;
  categoryId?: number | null;
}

export interface UpdateBrandInput {
  name?: string | null;
}

export interface UpdateBugInput {
  description?: string | null;
  url?: string | null;
  status?: BugStatus | null;
}

export interface UpdateBuildingInput {
  name?: string | null;
  siteId?: number | null;
}

export interface UpdateCallInput {
  additionalInformations?: string | null;
  customerId?: number | null;
  siteId?: number | null;
  contactId?: number | null;
}

export interface UpdateContactInput {
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  email?: string | null;
  customerId?: number | null;
  siteId?: number | null;
}

export interface UpdateCustomerCategoryInput {
  name?: string | null;
}

export interface UpdateCustomerInput {
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
}

export interface UpdateEntranceInput {
  name?: string | null;
  buildingId?: number | null;
  stagesCount?: number | null;
  basementsCount?: number | null;
}

export interface UpdateEquipmentCategoryInput {
  name?: string | null;
}

export interface UpdateEquipmentInput {
  informations?: string | null;
  categoryId?: number | null;
}

export interface UpdateFloorInput {
  name?: string | null;
  type?: FloorType | null;
  entranceId?: number | null;
  order?: number | null;
}

export interface UpdatePriceRuleInput {
  amount?: number | null;
  type?: PriceRuleType | null;
  description?: string | null;
  customerId?: number | null;
  benefitId?: number | null;
  categoryId?: number | null;
}

export interface UpdateReferenceInput {
  name?: string | null;
  description?: string | null;
  brandId?: number | null;
  categoryId?: number | null;
}

export interface UpdateSiteInput {
  lat?: number | null;
  lng?: number | null;
  streetNumber?: string | null;
  street?: string | null;
  postal?: string | null;
  city?: string | null;
  name?: string | null;
  customerId?: number | null;
  completed?: boolean | null;
}

export interface UpdateSupplierInput {
  lat?: number | null;
  lng?: number | null;
  streetNumber?: string | null;
  street?: string | null;
  postal?: string | null;
  city?: string | null;
  name?: string | null;
  description?: string | null;
}

export interface UpdateUserInput {
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface UpdateWorkOrderInput {
  lat?: number | null;
  lng?: number | null;
  streetNumber?: string | null;
  street?: string | null;
  postal?: string | null;
  city?: string | null;
  name?: string | null;
  description?: string | null;
  type?: WorkOrderType | null;
  date?: string | null;
  start?: string | null;
  end?: string | null;
  customerId?: number | null;
  siteId?: number | null;
  userId?: number | null;
  emplacementIds?: number[] | null;
}

export interface UsersFiltersInput {
  search?: string | null;
  role?: UserRole | null;
}

export interface WorkOrderFiltersInput {
  search?: string | null;
  postal?: string | null;
  city?: string | null;
  siteId?: number | null;
  customerId?: number | null;
  status?: WorkOrderStatus | null;
  date?: any | null;
  userId?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
