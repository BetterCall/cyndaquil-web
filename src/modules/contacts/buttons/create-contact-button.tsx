import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateContactButton = () => {
  const { data } = useCanAccess("contact:create");
  if (data?.canAccess)
    return (
      <Link to="/contact/create">
        <div className="btn btn-primary">Ajouter un nouveau Contact</div>
      </Link>
    );

  return null;
};
