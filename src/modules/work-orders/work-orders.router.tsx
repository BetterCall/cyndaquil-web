import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import {
  CreateWorkOrder,
  MyTour,
  UpdateWorkOrder,
  WorkOrder,
  WorkOrders,
} from "./pages";

export const WorkOrdersRouter = [
  <Route
    path="/work-orders"
    element={
      <ProtectedRoute roles={["Any"]}>
        <WorkOrders />
      </ProtectedRoute>
    }
  />,

  <Route
    path="/my-tour"
    element={
      <ProtectedRoute roles={["Any"]}>
        <MyTour />
      </ProtectedRoute>
    }
  />,

  <Route path="/work-order">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <WorkOrder />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateWorkOrder />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateWorkOrder />
        </ProtectedRoute>
      }
    />
  </Route>,
];
