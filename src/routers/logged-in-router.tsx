import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";

import { Home } from "../pages/home";
import { EditUser } from "../pages/users/edit-user";
import { SearchUsers } from "../pages/users/search-users";
import { User } from "../pages/users/user";
import { Users } from "../pages/users/users";

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/search" element={<SearchUsers />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/users/:userId/edit" element={<EditUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
