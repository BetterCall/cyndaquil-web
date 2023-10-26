import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { RequestWrapper } from "../../routers/request-wrapper";
import { UserRole } from "../../__generated__/globalTypes";
import { Todo } from "../todo";
import { Demand, Demands, CreateDemand } from "./pages";

export const DemandsRouter = [
  <Route
    path="/demands"
    element={
      <ProtectedRoute roles={["Any"]}>
        <RequestWrapper component={Demands} />
      </ProtectedRoute>
    }
  />,

  <Route path="/demand">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Demand />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateDemand />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={[UserRole.Client, "Any"]}>
          <Todo />
        </ProtectedRoute>
      }
    />
  </Route>,
];
