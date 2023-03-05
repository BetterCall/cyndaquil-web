import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";

export const WorkOrderRowsRouter = [
  <Route
    path="/work-order-rows"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Todo />
      </ProtectedRoute>
    }
  />,

  <Route path="/work-order-row">
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
