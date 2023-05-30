import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditContractButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("contract:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/contracts/${id}/update`}>
        <div className="btn btn-primary">Modifier la proposition</div>
      </Link>
    );
  return null;
};
