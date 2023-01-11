import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { UserRole } from "../../__generated__/globalTypes";
import { Todo } from "../todo";
import { Benefits, CreateBenefit, UpdateBenefit } from "./pages";

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
          <Todo />
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
