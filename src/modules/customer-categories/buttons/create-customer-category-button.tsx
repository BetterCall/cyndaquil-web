import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateCustomerCategoryButton = () => {
  const { data } = useCanAccess("customer-category:create");
  if (data?.canAccess)
    return (
      <Link to="/customer/category/create">
        <div className="btn btn-primary">Créer un Nouveau Client</div>
      </Link>
    );

  return null;
};
