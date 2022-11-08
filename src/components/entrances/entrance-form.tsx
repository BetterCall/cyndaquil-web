import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../button";

interface IEntranceForm {
  submit: any;
  loading: boolean;

  form: UseFormReturn<any, any>;
}

export const EntranceForm: React.FC<IEntranceForm> = ({
  submit,
  loading,
  form: {
    register,
    formState: { isValid },
  },
}) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          {...register("name", { required: "name required" })}
          placeholder="Name"
          className="w-full input"
        />
      </div>
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          {...register("stagesCount", { required: "phone required" })}
          placeholder="Nombre d'étages"
          className="w-full input"
        />
      </div>
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          {...register("basementsCount", { required: "phone required" })}
          placeholder="Nb de Sous-Sol"
          className="w-full input"
        />
      </div>
      <div className="w-full p-3">
        <Button
          canClick={isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </div>
  );
};
