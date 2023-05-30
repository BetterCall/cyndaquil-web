import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import {
  CreateContactCategory,
  ContactCategories,
  UpdateContactCategory,
  ContactCategory,
} from "./pages";

export const ContactCategoriesRouter = [
  <Route
    path="/contacts/categories"
    element={
      <ProtectedRoute roles={["Any"]}>
        <ContactCategories />
      </ProtectedRoute>
    }
  />,

  <Route path="/contacts/category">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <ContactCategory />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateContactCategory />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateContactCategory />
        </ProtectedRoute>
      }
    />
  </Route>,
];
