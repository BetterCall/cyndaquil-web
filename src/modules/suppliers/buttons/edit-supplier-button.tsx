import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditSupplierButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("supplier:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/supplier/${id}/update`}>
        <div className="btn btn-primary">Modifier le Fournisseur</div>
      </Link>
    );
  return null;
};
