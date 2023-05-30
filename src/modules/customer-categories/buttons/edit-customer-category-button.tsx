import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditCustomerCategoryButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("customer-category:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/customer/category/${id}/update`}>
        <div className="btn btn-primary">Modifier le Type de Client</div>
      </Link>
    );
  return null;
};
