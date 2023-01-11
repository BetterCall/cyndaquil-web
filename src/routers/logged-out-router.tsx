import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../modules/404";

import { Login } from "../modules/login";

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
