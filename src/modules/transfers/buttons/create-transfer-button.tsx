import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateTransferButton = () => {
  const { data } = useCanAccess("transfer:create");
  if (data?.canAccess)
    return (
      <Link to="/transfer/create">
        <div className="btn btn-primary">Saisir un Remboursement</div>
      </Link>
    );
  return null;
};
