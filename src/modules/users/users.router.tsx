import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { CreateUser, UpdateUser, User, Users } from "./pages";

export const UsersRouter = [
  <Route
    path="/users"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Users />
      </ProtectedRoute>
    }
  />,

  <Route path="/user">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <User />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateUser />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateUser />
        </ProtectedRoute>
      }
    />
  </Route>,
];
