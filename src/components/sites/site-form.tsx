import React from "react";
import { UseFormReturn } from "react-hook-form";

import { AddressInputs } from "../address-inputs";
import { Button } from "../button";
import { CustomerInput } from "../customers";
import { FormError } from "../form-error";

import { Card } from "../cards";
import { FormHeader } from "../form";

interface ISiteForm {
  loading: boolean;
  form: UseFormReturn<any, any>;
  submit: any;
}

export const SiteForm: React.FC<ISiteForm> = ({ loading, submit, form }) => {
  return (
    <>
      <Card>
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

          <CustomerInput form={form} />
          <div className="mb-5"></div>
        </div>
      </Card>

      <Card>
        <FormHeader
          title="Adresse"
          subtitle="Update your billing details and address."
        />

        <div className="w-full">
          <AddressInputs form={form} />
        </div>
      </Card>

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
