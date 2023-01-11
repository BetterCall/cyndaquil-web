import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { Todo } from "../todo";
import { Prices, CreatePrice, UpdatePrice } from "./pages";

export const PricesRouter = [
  <Route
    path="/prices"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Prices />
      </ProtectedRoute>
    }
  />,

  <Route path="/price">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Todo />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreatePrice />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdatePrice />
        </ProtectedRoute>
      }
    />
  </Route>,
];
