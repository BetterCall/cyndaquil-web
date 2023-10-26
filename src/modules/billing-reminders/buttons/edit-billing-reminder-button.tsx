import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditBillingReminderButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("billing-reminder:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/billing-reminder/${id}/update`}>
        <div className="btn btn-primary">Modifier la Relance</div>
      </Link>
    );
  return null;
};
