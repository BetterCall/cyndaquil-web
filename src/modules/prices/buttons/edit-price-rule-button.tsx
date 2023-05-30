import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditPriceRuleButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("price-rule:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/price/${id}/update`}>
        <div className="btn btn-primary">Modifier la Tarification</div>
      </Link>
    );
  return null;
};
