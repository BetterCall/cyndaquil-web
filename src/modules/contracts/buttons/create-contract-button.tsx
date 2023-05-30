import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateContractButton = () => {
  const { data } = useCanAccess("contract:create");
  if (data?.canAccess)
    return (
      <Link to="/contract/create">
        <div className="btn btn-primary">Créer une nouvelle Proposition</div>
      </Link>
    );

  return null;
};
