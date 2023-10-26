import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { RequestWrapper } from "../../routers/request-wrapper";
import { CreateCustomer, Customer, Customers, UpdateCustomer } from "./pages";

export const CustomersRouter = [
  <Route
    path="/customers"
    element={
      <ProtectedRoute roles={["Any"]}>
        <RequestWrapper component={Customers} />
      </ProtectedRoute>
    }
  />,

  <Route path="/customer">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Customer />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateCustomer />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateCustomer />
        </ProtectedRoute>
      }
    />
  </Route>,
];
