import { DeepPartial } from "react-hook-form";
import { Link } from "react-router-dom";
import { stringifyObject } from "../../../helpers/clean-object";
import { CreateEquipmentInput } from "../../../__generated__/globalTypes";
import { useCanAccess } from "../../permissions/hooks";

export const CreateEquipmentButton: React.FC<
  DeepPartial<CreateEquipmentInput>
> = (args) => {
  const { data } = useCanAccess("equipment:create");
  if (data?.canAccess)
    return (
      <Link to={`/equipment/create?${stringifyObject(args)}`}>
        <div className="btn btn-primary">Créer un Equipement</div>
      </Link>
    );

  return null;
};
