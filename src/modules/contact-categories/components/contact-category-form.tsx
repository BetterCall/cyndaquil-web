import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { FormError } from "../../../components/form-error";

interface IContactCategoryForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const ContactCategoryForm: React.FC<IContactCategoryForm> = ({
  loading,
  submit,

  form,
}) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Nom de la catégorie</p>
        <input
          className="w-full input"
          type="text"
          {...form.register("name", {
            required: "Le nom de la catégory de client est requis",
          })}
          placeholder="Nom"
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="name"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>
      <div className="w-full p-3">
        <Button
          canClick={form.formState?.isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </div>
  );
};
