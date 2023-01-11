import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { UserRole } from "../../__generated__/globalTypes";
import { Bug, Bugs } from "./pages";

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
  </Route>,
];
