import React from "react";
import { Loading } from "../../components";
import { UserRole } from "../../__generated__/globalTypes";
import { NotFound } from "../404";
import { useMe } from "../users/hooks/useMe";
import {
  Admin,
  Commercial,
  Customer,
  Employee,
  Secretary,
  Tech,
} from "./pages";

export const Dashboard: React.FC = () => {
  const { data, loading } = useMe();

  if (loading) return <Loading />;
  if (!data?.me) return <NotFound />;

  if (data?.me?.role === UserRole.Admin) {
    return <Admin />;
  }

  if (data?.me?.role === UserRole.Client) {
    return <Customer />;
  }
  if (data?.me?.role === UserRole.Commercial) {
    return <Commercial />;
  }

  if (data?.me?.role === UserRole.Employee) {
    return <Employee />;
  }

  if (data?.me?.role === UserRole.Secretary) {
    return <Secretary />;
  }

  if (data?.me?.role === UserRole.Tech) {
    return <Tech />;
  }

  return <div>Dashboard</div>;
};
