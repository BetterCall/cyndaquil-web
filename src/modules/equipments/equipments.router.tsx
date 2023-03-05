import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import {
  Equipment,
  Equipments,
  CreateEquipment,
  UpdateEquipment,
} from "./pages";

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
          <CreateEquipment />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateEquipment />
        </ProtectedRoute>
      }
    />
  </Route>,
];
