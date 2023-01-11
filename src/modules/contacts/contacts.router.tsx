import { Route } from "react-router-dom";
import { ProtectedRoute } from "../../routers/protected-route";
import { UserRole } from "../../__generated__/globalTypes";
import { Todo } from "../todo";
import { Contact, Contacts, CreateContact, UpdateContact } from "./pages";

export const ContactsRouter = [
  <Route
    path="/contacts"
    element={
      <ProtectedRoute roles={["Any"]}>
        <Contacts />
      </ProtectedRoute>
    }
  />,

  <Route path="/contact">
    <Route
      path=":id"
      element={
        <ProtectedRoute roles={["Any"]}>
          <Contact />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path="create"
      element={
        <ProtectedRoute roles={["Any"]}>
          <CreateContact />
        </ProtectedRoute>
      }
    />
    ,
    <Route
      path=":id/update"
      element={
        <ProtectedRoute roles={["Any"]}>
          <UpdateContact />
        </ProtectedRoute>
      }
    />
  </Route>,
];
