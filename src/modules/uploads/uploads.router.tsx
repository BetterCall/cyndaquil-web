import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { CreateUpload, Uploads } from "./pages";

export const UploadsRouter = [
  <Route
    path="/uploads"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Uploads />
      </ProtectedRoute>
    }
  />,

  <Route path="/upload">
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
          <CreateUpload />
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
