import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Payment, Payments, CreatePayment, UpdatePayment } from "./pages";

export const PaymentsRouter = [
  <Route
    path="/payments"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Payments />
      </ProtectedRoute>
    }
  />,

  <Route path="/payment">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Payment />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreatePayment />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdatePayment />
        </ProtectedRoute>
      }
    />
  </Route>,
];
