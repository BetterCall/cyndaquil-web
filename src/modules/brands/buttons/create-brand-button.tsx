import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateBrandButton = () => {
  const { data } = useCanAccess("brand:create");
  if (data?.canAccess)
    return (
      <Link to="/brand/create">
        <div className="btn btn-primary">Ajouter une Marque</div>
      </Link>
    );

  return null;
};
