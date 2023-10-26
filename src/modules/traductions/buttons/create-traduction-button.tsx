import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateTraductionButton = () => {
  const { data } = useCanAccess("traduction:create");
  if (data?.canAccess)
    return (
      <Link to="/traduction/create">
        <div className="btn btn-primary">Créer une Nouvelle Traduction</div>
      </Link>
    );

  return null;
};
