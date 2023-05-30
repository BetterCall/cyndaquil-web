import React from "react";
import { Link } from "react-router-dom";
import { useCanAccess } from "../../permissions/hooks";

export const CreateContactCategoryButton = () => {
  const { data } = useCanAccess("contact-category:create");
  if (data?.canAccess)
    return (
      <Link to="/contact/category/create">
        <div className="btn btn-primary">Ajouter une Catégorie</div>
      </Link>
    );

  return null;
};
