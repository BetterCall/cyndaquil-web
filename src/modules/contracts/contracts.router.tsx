import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Contract, Contracts, CreateContract, UpdateContract } from "./pages";

export const ContractsRouter = [
  <Route
    path="/contracts"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Contracts />
      </ProtectedRoute>
    }
  />,

  <Route path="/contract">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Contract />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateContract />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateContract />
        </ProtectedRoute>
      }
    />
  </Route>,
];
