import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";

import { AddressInputs } from "../address-inputs";
import { Button } from "../button";
import { FormError } from "../form-error";

import {
  CreateEntranceInput,
  EditCustomerInput,
} from "../../__generated__/globalTypes";

interface ICustomerForm {
  loading: boolean;
  register: UseFormRegister<any>;
  submit: any;
  formState: FormState<CreateEntranceInput>;
}

export const EntranceForm: React.FC<ICustomerForm> = ({
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
        placeholder="Name"
        className="input "
      />
      {errors.name?.message && <FormError message={errors.name?.message} />}

      <input
        {...register("stagesCount", { required: "phone required" })}
        placeholder="Nombre d'étages"
        className="input "
      />
      {errors.stagesCount?.message && (
        <FormError message={errors.stagesCount?.message} />
      )}
      <input
        {...register("basementsCount", { required: "phone required" })}
        placeholder="Nb de Sous-Sol"
        className="input "
      />
      {errors.basementsCount?.message && (
        <FormError message={errors.basementsCount?.message} />
      )}
      <Button canClick={isValid} loading={loading} actionText="Valider" />
    </form>
  );
};
