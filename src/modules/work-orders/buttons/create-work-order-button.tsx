import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateVisitInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateWorkOrderButton: React.FC<DeepPartial<CreateVisitInput>> = (
  args
) => {
  const { data } = useCanAccess("work-order:create");
  if (data?.canAccess)
    return (
      <Link to={`/work-order/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Créer un bon d'intervention</div>
      </Link>
    );

  return null;
};
