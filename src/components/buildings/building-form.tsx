import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../button";

interface IBuildingForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const BuildingForm: React.FC<IBuildingForm> = ({
  loading,
  submit,
  form,
}) => {
  return (
    <div className="flex flex-wrap ">
      <div className="w-full py-3">
        <p className="mb-1.5 font-medium text-base text-coolGray-800">
          Nom du Batiment
        </p>
        <input
          className="w-full input"
          type="text"
          {...form.register("name", { required: "name required" })}
          placeholder="Nom du Batiment"
        />
      </div>
      <div className="w-full p-3 flex justify-center align-items-center">
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
