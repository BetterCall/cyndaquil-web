import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateContactInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateContactButton: React.FC<DeepPartial<CreateContactInput>> = (
  args
) => {
  const { data } = useCanAccess("contact:create");
  if (data?.canAccess)
    return (
      <Link to={`/contact/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Ajouter un nouveau Contact</div>
      </Link>
    );

  return null;
};
