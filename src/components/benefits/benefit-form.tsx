import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../button";

interface IBenefitForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const BenefitForm: React.FC<IBenefitForm> = ({
  form,
  loading,
  submit,
}) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("name", { required: "name required" })}
          placeholder="Nom du service"
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Prix</p>
        <input
          className="w-full input"
          {...form.register("price", { required: "price required" })}
          placeholder="Prix HT "
        />
      </div>

      <div className="w-full p-3">
        <Button
          actionText="Valider"
          canClick={form.formState.isValid}
          onClick={submit}
          loading={loading}
        />
      </div>
    </div>
  );
};
