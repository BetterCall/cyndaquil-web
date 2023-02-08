import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../../../components/button";
import { SiteInput } from "../../sites/components/site-input";
import { ContactInput } from "../../contacts/components";
import { UserSelect } from "../../users/components";
import { CustomerInput } from "../../customer/components";
import { DemandTypeSelect } from "./demand-type-select";

interface IDemandForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const DemandForm: React.FC<IDemandForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  return (
    <div className="card">
      <div className="w-full">
        <div className="mb-3">
          <DemandTypeSelect form={form} />
        </div>

        <div className="w-full pb-3">
          <p className="mb-1.5 font-medium text-base text-coolGray-800">
            Objet de la demande
          </p>
          <input
            className="w-full input"
            type="text"
            {...form.register("object", { required: "name required" })}
          />
        </div>

        <ContactInput
          disabled={disabledFields.includes("contactId")}
          form={form}
        />
        <CustomerInput
          disabled={disabledFields.includes("customerId")}
          form={form}
          canSelectAddress={false}
        />
        <SiteInput
          disabled={disabledFields.includes("siteId")}
          form={form}
          canSelectAddress={false}
        />

        <UserSelect
          form={form}
          name="targetUserId"
          label="Demande addressée à"
        />

        <div className="w-full ">
          <p className="label">Nom</p>
          <textarea
            {...form.register("additionalInformations", {
              required: "name required",
            })}
            placeholder="Informations"
            className="input w-full"
          />
        </div>
        <div className="w-full ">
          <Button
            canClick={form.formState.isValid}
            loading={loading}
            actionText="Valider"
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
};
