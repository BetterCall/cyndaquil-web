import React from "react";
import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateBillingReminderInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateBillingReminderButton: React.FC<
  DeepPartial<CreateBillingReminderInput>
> = (args) => {
  const { data } = useCanAccess("billing-reminder:create");
  console.log(data);
  if (data?.canAccess)
    return (
      <Link to={`/billing-reminder/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Saisir une relance</div>
      </Link>
    );

  return null;
};
