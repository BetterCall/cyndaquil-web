import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../modules/404";
import { useMe } from "../modules/users/hooks/useMe";

import { Dashboard } from "../modules/dashboard";

import { DashboardLayout } from "../layouts/dashboard.layout";
import { BenefitsRouter } from "../modules/benefits/benefits.router";
import { ProtectedRoute } from "./protected-route";
import { BrandsRouter } from "../modules/brands/brands.router";
import { BugsRouter } from "../modules/bugs/bugs.router";
import { DemandsRouter } from "../modules/demands/demands.router";
import { ContactsRouter } from "../modules/contacts/contacts.router";
import { ContractsRouter } from "../modules/contracts/contracts.router";
import { CustomersRouter } from "../modules/customer/customers.router";
import { CustomerCategoriesRouter } from "../modules/customer-categories/customer-categories.router";
import { EmplacementsRouter } from "../modules/emplacements/emplacements.router";
import { EquipmentCategoriesRouter } from "../modules/equipment-categories/equipment-categories.router";
import { EquipmentsRouter } from "../modules/equipments/equipments.router";
import { PricesRouter } from "../modules/prices/prices.router";
import { ReferencesRouter } from "../modules/references/references.router";
import { SitesRouter } from "../modules/sites/sites.router";
import { SuppliersRouter } from "../modules/suppliers/suppliers.router";
import { TaxesRouter } from "../modules/taxes/taxes.router";
import { UsersRouter } from "../modules/users/users.router";
import { WorkOrdersRouter } from "../modules/work-orders/work-orders.router";
import { ContactCategoriesRouter } from "../modules/contact-categories/contact-categories.router";
import { VisitsRouter } from "../modules/visits/visits.router";
import { InvoicesRouter } from "../modules/invoices/invoices.router";
import { PaymentsRouter } from "../modules/payments/payments.router";
import { TransfersRouter } from "../modules/transfers/transfers.router";
import { ChangelogsRouter } from "../modules/changelogs/changelogs.router";
import { ControlsRouter } from "../modules/controls/controls.router";
import { Test } from "../modules/maps/test";
import { useLoadScript } from "@react-google-maps/api";
import { Loading } from "../components";
import { PermissionsRouter } from "../modules/permissions/permissions.router";

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlZonzuifrfkR0g_e6PsuMxcTZ4IIigXQ",
    libraries: ["places"],
  });

  if (!data || loading || error) {
    return <Loading />;
  }

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route element={<ProtectedRoute roles={["Any"]} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          {BenefitsRouter}
          {BrandsRouter}
          {BugsRouter}
          {DemandsRouter}
          {ContactsRouter}
          {ContactCategoriesRouter}
          {ContractsRouter}
          {ControlsRouter}
          {CustomersRouter}
          {CustomerCategoriesRouter}
          {EmplacementsRouter}
          {EquipmentCategoriesRouter}
          {EquipmentsRouter}
          {PricesRouter}
          {ReferencesRouter}
          {SitesRouter}
          {SuppliersRouter}
          {TaxesRouter}
          {UsersRouter}
          {WorkOrdersRouter}
          {VisitsRouter}
          {InvoicesRouter}
          {PaymentsRouter}
          {TransfersRouter}
          {ChangelogsRouter}
          {PermissionsRouter}
          <Route
            path="/test"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Test />
              </ProtectedRoute>
            }
          />
          ,
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
