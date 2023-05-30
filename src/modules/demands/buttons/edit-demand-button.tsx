import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditDemandButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("demand:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/demand/${id}/update`}>
        <div className="btn btn-primary">Modifier la Demande</div>
      </Link>
    );
  return null;
};
