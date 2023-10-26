import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Benefit, Benefits, CreateBenefit, UpdateBenefit } from "./pages";
import { UserRole } from "../../__generated__/globalTypes";
import { RequestWrapper } from "../../routers/request-wrapper";

export const BenefitsRouter = [
  <Route
    path="/benefits"
    element={
      <ProtectedRoute roles={["Any"]}>
        <RequestWrapper component={Benefits} />
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
