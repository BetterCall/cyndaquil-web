import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditPaymentButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("payment:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/payment/${id}/update`}>
        <div className="btn btn-primary">Modifier la saisie du Paiement</div>
      </Link>
    );
  return null;
};
