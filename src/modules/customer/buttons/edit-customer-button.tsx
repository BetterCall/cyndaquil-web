import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditCustomerButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("customer:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/customer/${id}/update`}>
        <div className="btn btn-primary">Modifier le Client</div>
      </Link>
    );
  return null;
};
