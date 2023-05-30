import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreatePaymentButton = () => {
  const { data } = useCanAccess("payment:create");
  if (data?.canAccess)
    return (
      <Link to="/payment/create">
        <div className="btn btn-primary">Saisir un paiement</div>
      </Link>
    );

  return null;
};
