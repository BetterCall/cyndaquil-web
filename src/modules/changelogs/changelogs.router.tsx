import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Changelog, Changelogs } from "./pages";

export const ChangelogsRouter = [
  <Route
    path="/changelogs"
    element={
      <ProtectedRoute roles={["Admin"]}>
        <Changelogs />
      </ProtectedRoute>
    }
  />,

  <Route path="/changelog">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Admin"]}>
          <Changelog />
        </ProtectedRoute>
      }
    />
  </Route>,
];
