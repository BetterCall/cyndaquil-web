import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Permissions } from "./pages";

export const PermissionsRouter = [
  <Route
    path="/permissions"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Permissions />
      </ProtectedRoute>
    }
  />,

  <Route path="/permission">
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
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Todo />
        </ProtectedRoute>
      }
    />
  </Route>,
];
