import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../../../components";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";
import { ReferenceInput } from "../../references/components";

interface IProps {
  loading: boolean;
  form: UseFormReturn<any, any>;
  submit: any;
  disabledFields?: string[];
}

export const EquipmentForm: React.FC<IProps> = ({
  disabledFields = [],
  loading,
  submit,
  form,
}) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <EquipmentCategoriesInput form={form} />
      </div>

      <div className="w-full p-3">
        <ReferenceInput form={form} />
      </div>

      <div className="w-full p-3">
        <p className="label">Numero</p>
        <input
          {...form.register("code", {
            required: "Saisissez le numero présent sur l'etiquette",
          })}
          type="text "
          className="input w-full"
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="code"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Informations Complementaires</p>
        <p className="text-xs font-medium text-gray-500 -mt-2 mb-3">
          Saisissez les défauts eventuels de l'equipement
        </p>
        <textarea {...form.register("information")} className="input w-full" />
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
