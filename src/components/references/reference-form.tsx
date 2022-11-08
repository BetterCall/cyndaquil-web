import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../button";
import { Card } from "../cards";
import { BrandInput } from "../brands";
import { EquipmentCategoriesInput } from "../equipment-categories";

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
    <Card>
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
    </Card>
  );
};
