import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";

import { Home } from "../pages/home";

import { CreateBuilding, EditBuilding, Building } from "../pages/buildings";
import { CreateCall, Calls } from "../pages/calls";

import { Contract, Contracts, CreateContract } from "../pages/contracts";
import {
  CreateCustomerCategory,
  CustomerCategories,
  EditCustomerCategory,
} from "../pages/customer-categories";

import {
  CreateCustomer,
  Customer,
  Customers,
  EditCustomer,
} from "../pages/customer";

import { CreateEntrance } from "../pages/entrances";

import {
  CreateEquimentCategory,
  EditEquipmentCategory,
  EquipmentCategories,
} from "../pages/equipment-categories";

import { Site, Sites, CreateSite, EditSite } from "../pages/sites";
import { EditUser, User, Users } from "../pages/users";
import {
  CreateWorkOrder,
  EditWorkOrder,
  WorkOrder,
  WorkOrders,
} from "../pages/work-orders";
import { Contact, Contacts, CreateContact } from "../pages/contacts";
import { Bug, Bugs } from "../pages/bugs";
import { Todo } from "../pages/todo";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/create" element={<CreateCustomer />} />
        <Route path="/customers/:id" element={<Customer />} />
        <Route path="/customers/:id/edit" element={<EditCustomer />} />

        {/* Customer Categories */}
        <Route path="/customers/categories" element={<CustomerCategories />} />
        <Route
          path="/customers/categories/:id/edit"
          element={<EditCustomerCategory />}
        />
        <Route
          path="/customers/categories/create"
          element={<CreateCustomerCategory />}
        />

        <Route path="/sites" element={<Sites />} />
        <Route path="/sites/create" element={<CreateSite />} />
        <Route path="/sites/:id" element={<Site />} />
        <Route path="/sites/:id/edit" element={<EditSite />} />
        <Route
          path="/sites/:id/buildings/create"
          element={<CreateBuilding />}
        />
        <Route
          path="/sites/:siteId/buildings/:buildingId"
          element={<Building />}
        />

        <Route
          path="/sites/:siteId/buildings/:buildingId/edit"
          element={<EditBuilding />}
        />

        <Route
          path="/sites/:siteId/buildings/:buildingId/entrances/create"
          element={<CreateEntrance />}
        />

        <Route
          path="/sites/:id/contracts/create"
          element={<CreateContract />}
        />

        {/* Equipments Categories */}
        <Route
          path="/equipments/categories"
          element={<EquipmentCategories />}
        />
        <Route
          path="/equipments/categories/:id/edit"
          element={<EditEquipmentCategory />}
        />
        <Route
          path="/equipments/categories/create"
          element={<CreateEquimentCategory />}
        />

        <Route path="/calls" element={<Calls />} />
        <Route path="/calls/create" element={<CreateCall />} />

        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contracts/:id" element={<Contract />} />

        <Route path="/work-orders" element={<WorkOrders />} />
        <Route path="/work-orders/create" element={<CreateWorkOrder />} />
        <Route path="/work-orders/:id/edit" element={<EditWorkOrder />} />
        <Route path="/work-orders/:id" element={<WorkOrder />} />

        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<Contact />} />
        <Route path="/contacts/create" element={<CreateContact />} />
        <Route path="/contacts/:id/edit" element={<Todo />} />

        <Route path="/bugs" element={<Bugs />} />
        <Route path="/bugs/:id" element={<Bug />} />
        <Route path="/bugs/:id/edit" element={<Todo />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
