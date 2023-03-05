import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormError } from "../../../components/form-error";

import { Button } from "../../../components/button";
import {} from "../../../components/cards";
import { ErrorMessage } from "@hookform/error-message";

interface IBrandForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const BrandForm: React.FC<IBrandForm> = ({ loading, submit, form }) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...form.register("name", {
            required: "Le nom de la marque est requis",
          })}
          placeholder="Nom de la Marque"
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="name"
          render={({ message }) => <p className="error-message">{message}</p>}
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
