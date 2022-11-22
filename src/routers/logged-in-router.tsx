import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";

import { Home } from "../pages/home";

import { CreateBuilding, UpdateBuilding, Building } from "../pages/buildings";
import { CreateCall, Calls } from "../pages/calls";

import {
  Contract,
  Contracts,
  CreateContract,
  UpdateContract,
} from "../pages/contracts";
import {
  CreateCustomerCategory,
  CustomerCategories,
  UpdateCustomerCategory,
} from "../pages/customer-categories";

import {
  CreateCustomer,
  Customer,
  Customers,
  UpdateCustomer,
} from "../pages/customer";

import {
  CreateEquimentCategory,
  UpdateEquipmentCategory,
  EquipmentCategories,
  EquipmentCategory,
} from "../pages/equipment-categories";

import { Site, Sites, CreateSite, UpdateSite, SiteInit } from "../pages/sites";
import { UpdateUser, User, Users } from "../pages/users";
import {
  CreateWorkOrder,
  UpdateWorkOrder,
  WorkOrder,
  WorkOrders,
} from "../pages/work-orders";
import { Contact, Contacts, CreateContact } from "../pages/contacts";
import { Bug, Bugs } from "../pages/bugs";
import { Todo } from "../pages/todo";
import { Equipments } from "../pages/equipments";
import { Brand, Brands, CreateBrand, UpdateBrand } from "../pages/brands";

import {
  CreateSupplier,
  UpdateSupplier,
  Supplier,
  Suppliers,
} from "../pages/suppliers";
import {
  CreateReference,
  UpdateReference,
  Reference,
  References,
} from "../pages/references";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Equipment } from "../pages/equipments/equipment";
import { CreateBenefit, UpdateBenefit } from "../pages/benefits";
import { CreatePrice, UpdatePrice, Prices } from "../pages/prices";
import { CreateTaxe, UpdateTaxe, Taxes, Taxe } from "../pages/taxes";
import { Benefits } from "../pages/benefits/benefits";

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/:id/update" element={<UpdateUser />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customers/:id" element={<Customer />} />
          <Route path="/customers/:id/update" element={<UpdateCustomer />} />

          {/* Customer Categories */}
          <Route
            path="/customers/categories"
            element={<CustomerCategories />}
          />
          <Route
            path="/customers/categories/:id/update"
            element={<UpdateCustomerCategory />}
          />
          <Route
            path="/customers/categories/create"
            element={<CreateCustomerCategory />}
          />

          <Route path="/sites" element={<Sites />} />
          <Route path="/sites/create" element={<CreateSite />} />
          <Route path="/sites/:id" element={<Site />} />

          <Route path="/sites/:id/init" element={<SiteInit />} />

          <Route path="/sites/:id/update" element={<UpdateSite />} />
          <Route
            path="/sites/:id/buildings/create"
            element={<CreateBuilding />}
          />
          <Route
            path="/sites/:siteId/buildings/:buildingId"
            element={<Building />}
          />

          <Route
            path="/sites/:siteId/buildings/:buildingId/update"
            element={<UpdateBuilding />}
          />

          {/* Equipments Categories */}
          <Route
            path="/equipments/categories"
            element={<EquipmentCategories />}
          />
          <Route
            path="/equipments/categories/:id/update"
            element={<UpdateEquipmentCategory />}
          />
          <Route
            path="/equipments/categories/create"
            element={<CreateEquimentCategory />}
          />

          <Route path="/calls" element={<Calls />} />
          <Route path="/calls/create" element={<CreateCall />} />

          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/create" element={<CreateContract />} />
          <Route path="/contracts/:id" element={<Contract />} />
          <Route path="/contracts/:id/update" element={<UpdateContract />} />

          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/work-orders/create" element={<CreateWorkOrder />} />
          <Route path="/work-orders/:id/update" element={<UpdateWorkOrder />} />
          <Route path="/work-orders/:id" element={<WorkOrder />} />

          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<Contact />} />
          <Route path="/contacts/create" element={<CreateContact />} />

          <Route path="/equipments" element={<Equipments />} />
          <Route path="/equipments/:id" element={<Equipment />} />
          <Route path="/equipments/create" element={<Todo />} />
          <Route path="/equipments/:id/update" element={<Todo />} />

          <Route
            path="/equipments/category/:id"
            element={<EquipmentCategory />}
          />

          <Route path="/benefits" element={<Benefits />} />
          <Route path="/benefits/:id" element={<Todo />} />
          <Route path="/benefits/create" element={<CreateBenefit />} />
          <Route path="/benefits/:id/update" element={<UpdateBenefit />} />

          <Route path="/bugs" element={<Bugs />} />
          <Route path="/bugs/:id" element={<Bug />} />
          <Route path="/bugs/:id/update" element={<Todo />} />

          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/create" element={<CreateBrand />} />
          <Route path="/brands/:id" element={<Brand />} />
          <Route path="/brands/:id/update" element={<UpdateBrand />} />

          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/create" element={<CreateSupplier />} />
          <Route path="/suppliers/:id" element={<Supplier />} />
          <Route path="/suppliers/:id/update" element={<UpdateSupplier />} />

          <Route path="/references" element={<References />} />
          <Route path="/references/create" element={<CreateReference />} />
          <Route path="/references/:id" element={<Reference />} />
          <Route path="/references/:id/update" element={<UpdateReference />} />

          <Route path="/prices" element={<Prices />} />
          <Route path="/prices/create" element={<CreatePrice />} />
          <Route path="/prices/:id/update" element={<UpdatePrice />} />

          <Route path="/taxes" element={<Taxes />} />
          <Route path="/taxes/create" element={<CreateTaxe />} />
          <Route path="/taxes/:id" element={<Taxe />} />
          <Route path="/taxes/:id/update" element={<UpdateTaxe />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
};
