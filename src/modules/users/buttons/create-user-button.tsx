import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateUserButton = () => {
  const { data } = useCanAccess("user:create");
  if (data?.canAccess)
    return (
      <Link to="/user/create">
        <div className="btn btn-primary">
          Créer un Nouveau Compte Utilisateur
        </div>
      </Link>
    );
  return null;
};
