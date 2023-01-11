import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { CreateTaxe, UpdateTaxe, Taxes, Taxe } from "./pages";

export const TaxesRouter = [
  <Route
    path="/taxes"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Taxes />
      </ProtectedRoute>
    }
  />,

  <Route path="/taxe">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Taxe />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateTaxe />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateTaxe />
        </ProtectedRoute>
      }
    />
  </Route>,
];
