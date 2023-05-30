import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateSupplierButton = () => {
  const { data } = useCanAccess("supplier:create");
  if (data?.canAccess)
    return (
      <Link to="/supplier/create">
        <div className="btn btn-primary">Créer un Nouveau Fournisseur</div>
      </Link>
    );

  return null;
};
