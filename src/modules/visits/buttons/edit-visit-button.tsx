import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditVisitButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("visit:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/visit/${id}/update`}>
        <div className="btn btn-primary">Modifier le rendez vous</div>
      </Link>
    );
  return null;
};
