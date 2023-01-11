import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { CreateSite, UpdateSite, Site, Sites } from "./pages";

export const SitesRouter = [
  <Route
    path="/sites"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Sites />
      </ProtectedRoute>
    }
  />,

  <Route path="/site">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Site />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateSite />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateSite />
        </ProtectedRoute>
      }
    />
  </Route>,
];
