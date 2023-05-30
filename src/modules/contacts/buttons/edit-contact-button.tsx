import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditContactButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("contact:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/contacts/${id}/update`}>
        <div className="btn btn-primary">Modifier le Contact</div>
      </Link>
    );
  return null;
};
