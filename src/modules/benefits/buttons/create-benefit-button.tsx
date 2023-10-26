import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateBenefitInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateBenefitButton: React.FC<DeepPartial<CreateBenefitInput>> = (
  args
) => {
  const { data } = useCanAccess("benefit:create");
  console.log("data", data);

  if (data?.canAccess)
    return (
      <Link to={`/benefit/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Ajouter un nouveau service</div>
      </Link>
    );

  return null;
};
