import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateBenefitButton = () => {
  const { data } = useCanAccess("benefit:create");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to="/benefit/create">
        <div className="btn btn-primary">Ajouter un nouveau service</div>
      </Link>
    );

  return null;
};
