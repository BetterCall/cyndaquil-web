import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateControlButton = () => {
  const { data } = useCanAccess("control:create");
  if (data?.canAccess)
    return (
      <Link to="/control/create">
        <div className="btn btn-primary">Saisir une nouvelle Vérification</div>
      </Link>
    );

  return null;
};
