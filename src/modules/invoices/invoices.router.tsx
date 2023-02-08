import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Invoice, Invoices, CreateInvoice, UpdateInvoice } from "./pages";

export const InvoicesRouter = [
  <Route
    path="/invoices"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Invoices />
      </ProtectedRoute>
    }
  />,

  <Route path="/invoice">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Invoice />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateInvoice />
          <Todo />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Todo />
          <UpdateInvoice />
        </ProtectedRoute>
      }
    />
  </Route>,
];
