import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

interface IProps {
  id: number | string;
}
export const EditContactCategoryButton: React.FC<IProps> = ({ id }) => {
  const { data } = useCanAccess("contact-category:update");
  console.log("data", data);
  if (data?.canAccess)
    return (
      <Link to={`/contacts/category/${id}/update`}>
        <div className="btn btn-primary">Modifier le type de contact</div>
      </Link>
    );
  return null;
};
