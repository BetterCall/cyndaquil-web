import React from "react";
import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";

import { AddressInputs } from "../address-inputs";
import { Button } from "../button";
import { FormError } from "../form-error";

import {
  CreateWorkOrderInput,
  EditWorkOrderInput,
} from "../../__generated__/globalTypes";
import { CustomerInput } from "../customers";
import { SiteInput } from "../sites/site-input";
import { FormHeader } from "../form";
import { Card } from "../cards";

interface IWorkOrderFormProps {
  loading: boolean;
  setValue: any;
  register: UseFormRegister<any>;
  submit: any;
  formState: FormState<CreateWorkOrderInput> | FormState<EditWorkOrderInput>;
  watch: UseFormWatch<CreateWorkOrderInput> | UseFormWatch<EditWorkOrderInput>;
}

export const WorkOrderForm: React.FC<IWorkOrderFormProps> = ({
  loading,
  register,
  submit,
  setValue,
  watch,
  formState: { isValid, errors },
}) => {
  // @ts-ignore
  const additionalInformations: string = watch("additionalInformations");
  const rows =
    additionalInformations?.split("\n").length > 4
      ? additionalInformations?.split("\n").length
      : 4;
  console.log("additionalInformations", additionalInformations);
  return (
    <div className="w-full">
      <div className="flex flex-wrap pb-3 -m-3">
        <div className="w-full md:w-1/2 p-3">
          <Card>
            <FormHeader
              title="Informations Générales"
              subtitle="Update your billing details and address."
            />
            <div className="w-full  mb-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Nom
              </p>
              <input
                className="w-full input"
                {...register("name", { required: "name required" })}
                placeholder="name"
              />
              {errors.name?.message && (
                <FormError message={errors.name?.message} />
              )}
            </div>

            <CustomerInput setValue={setValue} canCreate={false} />
            <SiteInput setValue={setValue} canCreate={false} />

            <div className="w-full ">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Informations
              </p>
              <textarea
                style={{ height: "auto" }}
                rows={rows}
                {...register("additionalInformations", {
                  required: "name required",
                })}
                placeholder="Informations"
                className="input w-full "
              />
              {errors.additionalInformations?.message && (
                <FormError message={errors.additionalInformations?.message} />
              )}
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <Card>
            <AddressInputs register={register} errors={errors} />
          </Card>
        </div>
      </div>
      <Button
        canClick={isValid}
        loading={loading}
        actionText="Valider"
        onClick={submit}
      />
    </div>
  );
};
