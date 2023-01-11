import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { UserRole } from "../../__generated__/globalTypes";
import { Todo } from "../todo";
import { Calls, CreateCall } from "./pages";

export const CallsRouter = [
  <Route
    path="/calls"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Calls />
      </ProtectedRoute>
    }
  />,

  <Route path="/call">
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
          <CreateCall />
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
