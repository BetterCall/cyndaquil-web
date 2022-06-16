import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";

import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
