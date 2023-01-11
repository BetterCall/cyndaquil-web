import React from "react";
import { UseFormReturn } from "react-hook-form";

import { AddressInputs } from "../../../components/address-inputs";
import { Button } from "../../../components/button";

import {} from "../../../components/cards";
import { FormHeader } from "../../../components/form";
import { CustomerInput } from "../../customer/components";

interface ISiteForm {
  loading: boolean;
  form: UseFormReturn<any, any>;
  submit: any;
  disabledFields?: string[];
}

export const SiteForm: React.FC<ISiteForm> = ({
  disabledFields = [],
  loading,
  submit,
  form,
}) => {
  return (
    <>
      <div className="card">
        <FormHeader
          title="Informations Générales"
          subtitle="Update your billing details and address."
        />

        <div className="w-full">
          <div className="flex flex-wrap  -m-3">
            <div className="w-full  p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Nom de la Copropriété
              </p>
              <input
                className="w-full input"
                type="text"
                {...form.register("name", { required: "name required" })}
                placeholder="Nom de la Copropriété"
              />
            </div>
          </div>

          <div className="w-full">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Nombre de batiments
            </p>
            <input
              className="w-full input"
              type="number"
              {...form.register("buildingsCount", {
                required: "name required",
              })}
              placeholder="Nom de la Copropriété"
            />
          </div>

          <div className="w-full">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Nombre d'entrée
            </p>
            <input
              className="w-full input"
              type="number"
              {...form.register("entrancesCount", {
                required: "name required",
              })}
              placeholder="Nom de la Copropriété"
            />
          </div>

          <CustomerInput
            form={form}
            disabled={disabledFields.includes("customerId")}
          />
          <div className="mb-5"></div>
        </div>
      </div>

      <div className="card">
        <FormHeader
          title="Adresse"
          subtitle="Update your billing details and address."
        />

        <div className="w-full">
          <AddressInputs form={form} />
        </div>
      </div>

      <div className="flex justify-between">
        <div />
        <div>
          <Button
            canClick={form.formState.isValid}
            loading={loading}
            actionText="Valider"
            onClick={submit}
          />
        </div>
      </div>
    </>
  );
};
