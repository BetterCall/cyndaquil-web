import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateReferenceInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateReferenceButton: React.FC<
  DeepPartial<CreateReferenceInput>
> = (args) => {
  const { data } = useCanAccess("reference:create");
  if (data?.canAccess)
    return (
      <Link to={`/reference/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Créer une Nouvelle Référence</div>
      </Link>
    );

  return null;
};
