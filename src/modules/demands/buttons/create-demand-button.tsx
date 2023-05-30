import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateDemandButton = () => {
  const { data } = useCanAccess("demand:create");
  if (data?.canAccess)
    return (
      <Link to="/demand/create">
        <div className="btn btn-primary">Saisir une nouvelle Demande</div>
      </Link>
    );

  return null;
};
