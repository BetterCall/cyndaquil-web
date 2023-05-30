import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditInvoiceButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("invoice:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/invoice/${id}/update`}>
        <div className="btn btn-primary">Modifier la Facture</div>
      </Link>
    );
  return null;
};
