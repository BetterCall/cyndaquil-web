import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditControlButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("control:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/control/${id}/update`}>
        <div className="btn btn-primary">Modifier la Vérification</div>
      </Link>
    );
  return null;
};
