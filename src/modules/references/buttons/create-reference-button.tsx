import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateReferenceButton = () => {
  const { data } = useCanAccess("reference:create");
  if (data?.canAccess)
    return (
      <Link to="/reference/create">
        <div className="btn btn-primary">Créer une Nouvelle Référence</div>
      </Link>
    );

  return null;
};
