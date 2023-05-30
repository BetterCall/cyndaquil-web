import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Benefit, Benefits, CreateBenefit, UpdateBenefit } from "./pages";
import { UserRole } from "../../__generated__/globalTypes";

export const BenefitsRouter = [
  <Route
    path="/benefits"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Benefits />
      </ProtectedRoute>
    }
  />,

  <Route path="/benefit">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={[UserRole.Client, "Any"]}>
          <Benefit />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={[UserRole.Client, "Any"]}>
          <CreateBenefit />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={[UserRole.Client, "Any"]}>
          <UpdateBenefit />
        </ProtectedRoute>
      }
    />
  </Route>,
];
