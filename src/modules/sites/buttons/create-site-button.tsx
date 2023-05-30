import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateSiteButton = () => {
  const { data } = useCanAccess("site:create");
  if (data?.canAccess)
    return (
      <Link to="/site/create">
        <div className="btn btn-primary">Créer un Nouvel Immeuble</div>
      </Link>
    );

  return null;
};
