import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateVisitInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateVisitButton: React.FC<DeepPartial<CreateVisitInput>> = (
  args
) => {
  const { data } = useCanAccess("visit:create");
  if (data?.canAccess)
    return (
      <Link to={`/visit/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Prevoir un rendez vous</div>
      </Link>
    );

  return null;
};
