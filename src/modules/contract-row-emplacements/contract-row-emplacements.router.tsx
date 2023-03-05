import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";

export const ContractsRouter = [
  <Route
    path="/contract-row-emplacements"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Todo />
      </ProtectedRoute>
    }
  />,

  <Route path="/contract-row-emplacement">
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
