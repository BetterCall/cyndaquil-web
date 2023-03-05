import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../../../components/button";
import {} from "../../../components/cards";
import { BrandInput } from "../../brands/components";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";

interface IReferenceForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const ReferenceForm: React.FC<IReferenceForm> = ({
  loading,
  submit,
  form,
}) => {
  return (
    <div className="">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...form.register("name", { required: "name required" })}
          placeholder="Nom de la reference"
        />
      </div>

      <div className="w-full p-3">
        <EquipmentCategoriesInput form={form} />
      </div>

      <div className="w-full p-3">
        <BrandInput form={form} />
      </div>

      <div className="w-full p-3">
        <Button
          canClick={true}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </div>
  );
};
