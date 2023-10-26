import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateCustomerInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateCustomerButton: React.FC<
  DeepPartial<CreateCustomerInput>
> = (args) => {
  const { data } = useCanAccess("customer:create");
  if (data?.canAccess)
    return (
      <Link to={`/customer/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Créer un Nouveau Client</div>
      </Link>
    );

  return null;
};
