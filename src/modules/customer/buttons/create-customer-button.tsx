import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateCustomerButton = () => {
  const { data } = useCanAccess("customer:create");
  if (data?.canAccess)
    return (
      <Link to="/customer/create">
        <div className="btn btn-primary">Créer un Nouveau Client</div>
      </Link>
    );

  return null;
};
