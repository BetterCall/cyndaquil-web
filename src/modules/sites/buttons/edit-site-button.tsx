import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditSiteButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("site:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/site/${id}/update`}>
        <div className="btn btn-primary">Modifier l'immeuble</div>
      </Link>
    );
  return null;
};
