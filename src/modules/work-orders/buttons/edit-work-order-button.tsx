import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditWorkOrderButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("work-order:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/work-order/${id}/update`}>
        <div className="btn btn-primary">Modifier le bon</div>
      </Link>
    );
  return null;
};
