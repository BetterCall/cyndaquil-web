import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormError } from "../form-error";

import { Button } from "../button";
import { Card } from "../cards";

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
    <Card>
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...register("name", { required: "name required" })}
          placeholder="Nom de la Marque"
        />
        {errors.name?.message && <FormError message={errors.name?.message} />}
      </div>
      <div className="w-full p-3">
        <p className="label">Pourcentage</p>
        <input
          className="w-full input"
          {...register("value", { required: "name required" })}
          placeholder="Pourcentage de la taxe"
        />
        {errors.value?.message && <FormError message={errors.value?.message} />}
      </div>
      <div className="w-full p-3">
        <Button
          canClick={isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </Card>
  );
};
