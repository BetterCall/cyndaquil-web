import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Button } from "../../../components/button";
import { UserInput } from "../../users/components";
import { EquipmentInput } from "../../equipments/components";

interface IControlForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const ControlForm: React.FC<IControlForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  return (
    <div>
      <div className="w-full p-3">
        <EquipmentInput
          form={form}
          disabled={disabledFields.includes("equipmentId")}
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="code"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <div className="w-full p-3">
        <UserInput required form={form} label="Vérification faite par " />
      </div>

      <div className="w-full p-3">
        <p className="label">Commentaire / Travaux effectués</p>
        <textarea
          className="w-full input"
          {...form.register("comment", {
            required: "Le code de l'equipement est requis",
          })}
          placeholder="Tout est ok"
        />
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
