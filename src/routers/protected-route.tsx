import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Loading } from "../components";
import { useMe } from "../modules/users/hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

export type AllowedRoles = keyof typeof UserRole | "Any";

interface IProtectedRouteProps {
  roles: AllowedRoles[];
  children?: any;
}

function containsAny(source, target) {
  var result = source.filter(function (item) {
    return target.indexOf(item) > -1;
  });
  return result.length > 0;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  roles = [],
  children,
}) => {
  const { data, loading, error } = useMe();
  console.log({ data, loading, error });
  const location = useLocation();
  console.log(location);
  const renderRoutes = () => {
    return children ? children : <Outlet />;
  };

  if (loading) return <Loading />;
  if (!data?.me)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (containsAny(roles, [data?.me?.role, "Any"])) {
    return renderRoutes();
  } else {
    if (data?.me?.role === UserRole.Admin) {
      return <Navigate to="/admin" state={{ from: location }} />;
    }

    return <Navigate to="/404" state={{ from: location }} replace />;
  }
};
