import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";

import { Button } from "../button";
import { FormError } from "../form-error";

import {
  CreateBuildingInput,
  EditBuildingInput,
} from "../../__generated__/globalTypes";

interface ISiteForm {
  loading: boolean;
  register: UseFormRegister<any>;
  submit: any;
  formState: FormState<CreateBuildingInput> | FormState<EditBuildingInput>;
}

export const BuildingForm: React.FC<ISiteForm> = ({
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
        className="input "
      />
      {errors.name?.message && <FormError message={errors.name?.message} />}

      <Button canClick={isValid} loading={loading} actionText="Valider" />
    </form>
  );
};
