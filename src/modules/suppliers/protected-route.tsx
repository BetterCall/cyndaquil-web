import React from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "../../components";
import { useMe } from "../users/hooks/useMe";

export const ProtectedRoutes: React.FC = () => {
  const { data, loading } = useMe();

  if (loading) {
    return <Loading />;
  }

  return <Outlet />;
};
