import React from "react";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { useCanAccess } from "../../permissions/hooks";

interface ICreateInvoiceButtonProps {
  workOrderId?: number;
}

export const CreateInvoiceButton: React.FC<ICreateInvoiceButtonProps> = (
  args
) => {
  const { data } = useCanAccess("invoice:create");
  if (data?.canAccess)
    return (
      <Link to={`/invoice/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Nouvelle Facture</div>
      </Link>
    );

  return null;
};
