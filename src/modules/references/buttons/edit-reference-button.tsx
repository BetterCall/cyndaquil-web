import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditReferenceButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("reference:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/reference/${id}/update`}>
        <div className="btn btn-primary">Modifier la Référence</div>
      </Link>
    );
  return null;
};
