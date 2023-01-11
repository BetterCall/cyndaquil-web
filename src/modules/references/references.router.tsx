import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import {
  CreateReference,
  UpdateReference,
  References,
  Reference,
} from "./pages";

export const ReferencesRouter = [
  <Route
    path="/references"
    element={
      <ProtectedRoute roles={["Any"]}>
        <References />
      </ProtectedRoute>
    }
  />,

  <Route path="/reference">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Reference />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateReference />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateReference />
        </ProtectedRoute>
      }
    />
  </Route>,
];
