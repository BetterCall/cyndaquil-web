import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Emplacements, CreateEmplacement } from "./pages";

export const EmplacementsRouter = [
  <Route
    path="/emplacements"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Emplacements />
      </ProtectedRoute>
    }
  />,

  <Route path="/emplacement">
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
          <CreateEmplacement />
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
