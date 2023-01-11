import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Equipment, Equipments } from "./pages";

export const EquipmentsRouter = [
  <Route
    path="/equipments"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Equipments />
      </ProtectedRoute>
    }
  />,

  <Route path="/equipment">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Equipment />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Todo />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Todo />
        </ProtectedRoute>
      }
    />
  </Route>,
];
