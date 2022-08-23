import React from "react";
import { FormState, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { AddressInputs } from "../address-inputs";
import { Button } from "../button";
import { CustomerInput } from "../customers";
import { FormError } from "../form-error";

import {
  CreateSiteInput,
  EditSiteInput,
} from "../../__generated__/globalTypes";
import { Card } from "../cards";
import { FormHeader } from "../form";

interface ISiteForm {
  loading: boolean;
  register: UseFormRegister<any>;
  submit: any;
  formState: FormState<CreateSiteInput> | FormState<EditSiteInput>;
  setValue: UseFormSetValue<CreateSiteInput> | UseFormSetValue<EditSiteInput>;
  customerId?: number;
}

export const SiteForm: React.FC<ISiteForm> = ({
  loading,
  register,
  submit,
  formState: { isValid, errors },
  setValue,
  customerId,
}) => {
  return (
    <Card>
      <FormHeader
        title="Informations Générales"
        subtitle="Update your billing details and address."
      />

      <div className="w-full">
        <div className="flex flex-wrap pb-3 -m-3">
          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Nom de la Copropriété
            </p>
            <input
              className="w-full input"
              type="text"
              {...register("name", { required: "name required" })}
              placeholder="Nom de la Copropriété"
            />
            {errors.name?.message && (
              <FormError message={errors.name?.message} />
            )}
          </div>
        </div>

        <CustomerInput defaultValue={customerId} setValue={setValue} />
        <div className="mb-5"></div>

        <AddressInputs register={register} errors={errors} />

        <Button
          canClick={isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </Card>
  );
};
