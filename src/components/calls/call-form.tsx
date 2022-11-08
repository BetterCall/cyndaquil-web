import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../button";
import { CustomerInput } from "../customers";
import { SiteInput } from "../sites/site-input";
import { ContactInput } from "../contacts";
import { Card } from "antd";
import { FormHeader } from "../form";

interface ICallForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const CallForm: React.FC<ICallForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  return (
    <Card>
      <FormHeader title="ss" subtitle="dddd" />
      <div className="w-full  ">
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
    </Card>
  );
};
