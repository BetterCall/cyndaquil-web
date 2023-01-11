import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { FormError } from "../../../components/form-error";

interface IEquipmentCategoryForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const EquipmentCategoryForm: React.FC<IEquipmentCategoryForm> = ({
  loading,
  submit,

  form: {
    register,
    formState: { isValid, errors },
  },
}) => {
  return (
    <form
      className="grid max-w-screen-sm w-full gap-3 mt-5 mb-5 "
      onSubmit={submit}
    >
      <input
        {...register("name", { required: "name required" })}
        placeholder="name"
        className="input "
      />
      {errors.name?.message && <FormError />}

      <Button canClick={isValid} loading={loading} actionText="Valider" />
    </form>
  );
};
