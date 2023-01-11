import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { CreateSupplier, UpdateSupplier, Suppliers, Supplier } from "./pages";

export const SuppliersRouter = [
  <Route
    path="/suppliers"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Suppliers />
      </ProtectedRoute>
    }
  />,

  <Route path="/supplier">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Supplier />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateSupplier />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateSupplier />
        </ProtectedRoute>
      }
    />
  </Route>,
];
