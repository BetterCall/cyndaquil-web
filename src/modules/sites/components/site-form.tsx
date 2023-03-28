import React from "react";
import { UseFormReturn } from "react-hook-form";

import { AddressInputs } from "../../../components/address-inputs";
import { Button } from "../../../components/button";

import { CardHeader } from "../../../components/cards";
import { CustomerInput } from "../../customer/components";
import { UserInput } from "../../users/components";

interface ISiteForm {
  loading: boolean;
  form: UseFormReturn<any, any>;
  submit: any;
  disabledFields?: string[];
}

export const SiteForm: React.FC<ISiteForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  return (
    <section className="section">
      <div className="element">
        <div className="card">
          <CardHeader title="Informations Générales" />

          <div className="w-full mb-3">
            <p className="label">Nom de la Copropriété</p>
            <input
              className="w-full input"
              type="text"
              {...form.register("name", { required: "name required" })}
              placeholder="Nom de la Copropriété"
            />
          </div>

          <div className="w-full mb-3">
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

          <div className="w-full mb-3">
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
          <div className="w-full mb-3">
            <CustomerInput
              form={form}
              disabled={disabledFields.includes("customerId")}
            />
          </div>
        </div>
      </div>

      <div className="element">
        <div className="card">
          <CardHeader title="Adresse" />

          <div className="w-full">
            <AddressInputs form={form} />
          </div>
        </div>
      </div>

      <div className="element">
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
