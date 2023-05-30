import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditBenefitButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("benefit:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/benefit/${id}/update`}>
        <div className="btn btn-primary">Modifier le service</div>
      </Link>
    );
  return null;
};
