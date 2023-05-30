import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreatePriceRuleButton = () => {
  const { data } = useCanAccess("price-rule:create");
  if (data?.canAccess)
    return (
      <Link to="/price/create">
        <div className="btn btn-primary">Créer une Tarification</div>
      </Link>
    );

  return null;
};
