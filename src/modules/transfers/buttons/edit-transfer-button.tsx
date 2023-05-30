import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditTransferButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("transfer:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/transfer/${id}/update`}>
        <div className="btn btn-primary">
          Modifier la saisie du Remboursement
        </div>
      </Link>
    );
  return null;
};
