import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditBrandButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("brand:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/brand/${id}/update`}>
        <div className="btn btn-primary">Modifier la Marque</div>
      </Link>
    );
  return null;
};
