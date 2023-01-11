import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import {
  CreateCustomerCategory,
  CustomerCategories,
  UpdateCustomerCategory,
} from "./pages";

export const CustomerCategoriesRouter = [
  <Route
    path="/customers/categories"
    element={
      <ProtectedRoute roles={["Any"]}>
        <CustomerCategories />
      </ProtectedRoute>
    }
  />,

  <Route path="/customers/category">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Todo />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateCustomerCategory />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateCustomerCategory />
        </ProtectedRoute>
      }
    />
  </Route>,
];
