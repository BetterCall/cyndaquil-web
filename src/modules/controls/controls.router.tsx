import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { RequestWrapper } from "../../routers/request-wrapper";
import { Control, Controls, UpdateControl, CreateControl } from "./pages";

export const ControlsRouter = [
  <Route
    path="/controls"
    element={
      <ProtectedRoute roles={["Any"]}>
        <RequestWrapper component={Controls} />
      </ProtectedRoute>
    }
  />,

  <Route path="/control">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Control />
        </ProtectedRoute>
      }
    />
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateControl />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateControl />
        </ProtectedRoute>
      }
    />
  </Route>,
];
