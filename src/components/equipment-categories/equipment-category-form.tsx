import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { Button } from "../button";
import { FormError } from "../form-error";
import {
  CreateEquipmentCategoryInput,
  EditEquipmentCategoryInput,
} from "../../__generated__/globalTypes";

interface IEquipmentCategoryForm {
  loading: boolean;
  register: UseFormRegister<any>;
  submit: any;
  formState:
    | FormState<CreateEquipmentCategoryInput>
    | FormState<EditEquipmentCategoryInput>;
}

export const EquipmentCategoryForm: React.FC<IEquipmentCategoryForm> = ({
  loading,
  register,
  submit,
  formState: { isValid, errors },
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
      {errors.name?.message && <FormError message={errors.name?.message} />}

      <Button canClick={isValid} loading={loading} actionText="Valider" />
    </form>
  );
};
