import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { CreateTransfer, UpdateTransfer, Transfer, Transfers } from "./pages";

export const TransfersRouter = [
  <Route
    path="/transfers"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Transfers />
      </ProtectedRoute>
    }
  />,

  <Route path="/transfer">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Transfer />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateTransfer />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateTransfer />
        </ProtectedRoute>
      }
    />
  </Route>,
];
