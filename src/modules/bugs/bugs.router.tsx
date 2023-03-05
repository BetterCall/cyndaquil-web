import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Bug, Bugs } from "./pages";
import { CreateBug } from "./pages/create-bug";

export const BugsRouter = [
  <Route
    path="/bugs"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Bugs />
      </ProtectedRoute>
    }
  />,

  <Route path="/bug">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Bug />
        </ProtectedRoute>
      }
    />
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateBug />
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
