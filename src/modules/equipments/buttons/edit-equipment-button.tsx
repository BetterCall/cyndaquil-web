import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditEquipmentButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("equipment:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/equipment/${id}/update`}>
        <div className="btn btn-primary">Modifier l'equipement</div>
      </Link>
    );
  return null;
};
