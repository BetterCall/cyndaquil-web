import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { RequestWrapper } from "../../routers/request-wrapper";
import {
  CreateWorkOrder,
  GenerateTour,
  MyTour,
  UpdateWorkOrder,
  WorkOrder,
  WorkOrderProcessing,
  WorkOrders,
} from "./pages";

export const WorkOrdersRouter = [
  <Route
    path="/work-orders"
    element={
      <ProtectedRoute roles={["Any"]}>
        <RequestWrapper component={WorkOrders} />
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
      path="generate"
      element={
        <ProtectedRoute roles={["Any"]}>
          <GenerateTour />
        </ProtectedRoute>
      }
    />
    ,
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
    <Route
      path=":id/processing"
      element={
        <ProtectedRoute roles={["Any"]}>
          <WorkOrderProcessing />
        </ProtectedRoute>
      }
    />
  </Route>,
];
