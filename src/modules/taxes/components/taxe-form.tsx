import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormError } from "../../../components/form-error";

import { Button } from "../../../components/button";
import {} from "../../../components/cards";

interface ITaxeForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const TaxeForm: React.FC<ITaxeForm> = ({
  loading,
  submit,

  form: {
    register,
    formState: { isValid, errors },
  },
}) => {
  return (
    <div className="card">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...register("name", { required: "name required" })}
          placeholder="Nom de la Marque"
        />
        {errors.name?.message && <FormError />}
      </div>
      <div className="w-full p-3">
        <p className="label">Pourcentage</p>
        <input
          className="w-full input"
          {...register("value", { required: "name required" })}
          placeholder="Pourcentage de la taxe"
        />
        {errors.value?.message && <FormError />}
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
