import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditUserButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("user:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/user/${id}/update`}>
        <div className="btn btn-primary">Modifier le Compte</div>
      </Link>
    );
  return null;
};
