import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreatePriceRuleInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreatePriceRuleButton: React.FC<
  DeepPartial<CreatePriceRuleInput>
> = (args) => {
  const { data } = useCanAccess("contact:create");
  if (data?.canAccess)
    return (
      <Link to={`/price/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Ajouter un nouveau Contact</div>
      </Link>
    );

  return null;
};
