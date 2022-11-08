import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FloorType } from "../../__generated__/globalTypes";

import { Button } from "../button";

interface IFloorForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const FloorForm: React.FC<IFloorForm> = ({ loading, submit, form }) => {
  const type = form.watch("type");

  return (
    <div className="flex flex-wrap ">
      <div className="w-full py-3">
        <p className="mb-1.5 font-medium text-base text-coolGray-800">
          Nom de l'étage
        </p>
        <input
          className="w-full input"
          type="text"
          {...form.register("name", { required: "name required" })}
          placeholder="Nom de l'étage"
        />
      </div>

      <select
        className="input appearance-none w-full"
        {...form.register("type")}
      >
        <option value={undefined}>-</option>
        {Object.keys(FloorType).map((category: any) => (
          <option
            selected={type === category}
            value={category.id}
            key={`category-${category}`}
          >
            {category}
          </option>
        ))}
      </select>

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
