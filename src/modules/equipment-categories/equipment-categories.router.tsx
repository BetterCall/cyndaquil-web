import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import {
  CreateEquipmentCategory,
  EquipmentCategories,
  EquipmentCategory,
  UpdateEquipmentCategory,
} from "./pages";

export const EquipmentCategoriesRouter = [
  <Route
    path="/equipments/categories"
    element={
      <ProtectedRoute roles={["Any"]}>
        <EquipmentCategories />
      </ProtectedRoute>
    }
  />,

  <Route path="/equipments/category">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <EquipmentCategory />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateEquipmentCategory />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateEquipmentCategory />
        </ProtectedRoute>
      }
    />
  </Route>,
];
