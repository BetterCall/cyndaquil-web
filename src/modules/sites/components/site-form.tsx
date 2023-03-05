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
    <section className="section">
      <div className="left">
        <div className="card">
          <FormHeader
            title="Informations Générales"
            subtitle="Update your billing details and address."
          />

          <div className="w-full p-3">
            <p className="label">Nom de la Copropriété</p>
            <input
              className="w-full input"
              type="text"
              {...form.register("name", { required: "name required" })}
              placeholder="Nom de la Copropriété"
            />
          </div>

          <div className="w-full p-3">
            <p className="label">Nombre de batiments</p>
            <input
              className="w-full input"
              type="number"
              {...form.register("buildingsCount", {
                required: "name required",
              })}
              placeholder="Nom de la Copropriété"
            />
          </div>

          <div className="w-full p-3">
            <p className="label">Nombre d'entrée</p>
            <input
              className="w-full input"
              type="number"
              {...form.register("entrancesCount", {
                required: "name required",
              })}
              placeholder="Nom de la Copropriété"
            />
          </div>
          <div className="w-full p-3">
            <CustomerInput
              form={form}
              disabled={disabledFields.includes("customerId")}
            />
          </div>
        </div>
      </div>

      <div className="right">
        <div className="card">
          <FormHeader
            title="Adresse"
            subtitle="Update your billing details and address."
          />

          <div className="w-full">
            <AddressInputs form={form} />
          </div>
        </div>
      </div>

      <div className="left">
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
      </div>
    </section>
  );
};
