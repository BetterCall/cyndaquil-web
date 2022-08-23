import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";

import { Button } from "../button";
import { FormError } from "../form-error";

import { CreateCallInput } from "../../__generated__/globalTypes";
import { CustomerInput } from "../customers";
import { SiteInput } from "../sites/site-input";
import { ContactInput } from "../contacts";

interface ICallForm {
  setValue: any;
  loading: boolean;
  register: UseFormRegister<any>;
  submit: any;
  formState: FormState<CreateCallInput>;
}

export const CallForm: React.FC<ICallForm> = ({
  setValue,
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
      <ContactInput setValue={setValue} canCreate={true} />
      <CustomerInput setValue={setValue} canCreate={true} />
      <SiteInput setValue={setValue} canCreate={true} />

      <input
        {...register("additionalInformations", { required: "name required" })}
        placeholder="Informations"
        className="input "
      />
      {errors.additionalInformations?.message && (
        <FormError message={errors.additionalInformations?.message} />
      )}

      <Button canClick={isValid} loading={loading} actionText="Valider" />
    </form>
  );
};
