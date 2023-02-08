import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { CreateVisit, UpdateVisit, Visit, Visits } from "./pages";

export const VisitsRouter = [
  <Route
    path="/visits"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Visits />
      </ProtectedRoute>
    }
  />,

  <Route path="/visit">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Visit />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateVisit />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateVisit />
        </ProtectedRoute>
      }
    />
  </Route>,
];
