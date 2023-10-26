import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateDemandInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateDemandButton: React.FC<DeepPartial<CreateDemandInput>> = (
  args
) => {
  const { data } = useCanAccess("demand:create");
  if (data?.canAccess)
    return (
      <Link to={`/demand/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Ouvrir une demande</div>
      </Link>
    );

  return null;
};
