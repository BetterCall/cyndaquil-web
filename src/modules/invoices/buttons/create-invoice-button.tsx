import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateInvoiceButton = () => {
  const { data } = useCanAccess("invoice:create");
  if (data?.canAccess)
    return (
      <Link to="/invoice/create">
        <div className="btn btn-primary">Creer la Fcature</div>
      </Link>
    );

  return null;
};
