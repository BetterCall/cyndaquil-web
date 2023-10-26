import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateControlInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateControlButton: React.FC<DeepPartial<CreateControlInput>> = (
  args
) => {
  const { data } = useCanAccess("control:create");
  if (data?.canAccess)
    return (
      <Link to={`/control/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Saisir une nouvelle Vérification</div>
      </Link>
    );

  return null;
};
