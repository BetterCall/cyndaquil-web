import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { UserRole } from "../../__generated__/globalTypes";
import { Brand, Brands, CreateBrand, UpdateBrand } from "./pages";

export const BrandsRouter = [
  <Route
    path="/brands"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Brands />
      </ProtectedRoute>
    }
  />,

  <Route path="/brand">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Brand />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateBrand />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={[UserRole.Client, "Any"]}>
          <UpdateBrand />
        </ProtectedRoute>
      }
    />
  </Route>,
];
