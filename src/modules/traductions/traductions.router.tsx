import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { CreateTraduction, UpdateTraduction, Traductions } from "./pages";

export const TraductionsRouter = [
  <Route
    path="/traductions"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Traductions />
      </ProtectedRoute>
    }
  />,

  <Route path="/traduction">
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateTraduction />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateTraduction />
        </ProtectedRoute>
      }
    />
  </Route>,
];
