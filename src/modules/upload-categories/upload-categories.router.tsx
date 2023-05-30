import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import {
  CreateUploadCategory,
  UploadCategories,
  UpdateUploadCategory,
} from "./pages";

export const UploadCategoriesRouter = [
  <Route
    path="/uploads/categories"
    element={
      <ProtectedRoute roles={["Any"]}>
        <UploadCategories />
      </ProtectedRoute>
    }
  />,

  <Route path="/uploads/category">
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
          <CreateUploadCategory />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateUploadCategory />
        </ProtectedRoute>
      }
    />
  </Route>,
];
