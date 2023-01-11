import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../../../components/button";
import {} from "../../../components/cards";
import { AddressInputs } from "../../../components/address-inputs";

interface ISupplierForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const SupplierForm: React.FC<ISupplierForm> = ({
  loading,
  submit,
  form,
}) => {
  return (
    <div className="card">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...form.register("name", { required: "name required" })}
          placeholder="Nom de la Marque"
        />
      </div>
      <div className="w-full p-3">
        <AddressInputs form={form} />
      </div>
      <div className="w-full p-3">
        <Button
          canClick={form.formState.isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </div>
  );
};
