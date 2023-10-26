import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import {
  BillingReminder,
  BillingReminders,
  CreateBillingReminder,
  UpdateBillingReminder,
} from "./pages";

export const BillingRemindersRouter = [
  <Route
    path="/billing-reminders"
    element={
      <ProtectedRoute roles={["Any"]}>
        <BillingReminders />
      </ProtectedRoute>
    }
  />,

  <Route path="/billing-reminder">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <BillingReminder />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateBillingReminder />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateBillingReminder />
        </ProtectedRoute>
      }
    />
  </Route>,
];
