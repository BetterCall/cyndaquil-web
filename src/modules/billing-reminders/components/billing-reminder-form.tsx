import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../../../components/button";
import { SiteInput } from "../../sites/components/site-input";
import { ContactInput } from "../../contacts/components";
import { UserSelect } from "../../users/components";
import { CustomerInput } from "../../customer/components";
import { BillingReminderStatusSelect } from "./billing-reminder-type-select";
import { ErrorMessage } from "@hookform/error-message";
import { InvoiceInput } from "../../invoices/components/invoice-input";

interface IBillingReminderForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const BillingReminderForm: React.FC<IBillingReminderForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  return (
    <div className="w-full">
      <div className="mb-3">
        <BillingReminderStatusSelect form={form} />
      </div>

      <div className="w-full pb-3">
        <p className="label">Objet de la demandee</p>
        <input
          className="w-full input"
          type="text"
          {...form.register("object", {
            required: "L'objet de la demande est requis",
          })}
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="object"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>
      <div className="w-full pb-3">
        <SiteInput
          disabled={disabledFields.includes("siteId")}
          form={form}
          canSelectAddress={false}
        />
      </div>
      <div className="w-full pb-3">
        <CustomerInput
          disabled={disabledFields.includes("customerId")}
          form={form}
          canSelectAddress={false}
        />

        <ContactInput
          disabled={disabledFields.includes("contactId")}
          form={form}
        />
      </div>
      <div className="w-full pb-3">
        <UserSelect
          form={form}
          name="targetUserId"
          label="Demande addressée à"
        />
      </div>
      <div className="w-full ">
        <p className="label">Nom</p>
        <textarea
          {...form.register("message")}
          placeholder="Informations"
          className="input w-full"
        />
      </div>
      <div className="w-full pt-3">
        <Button
          canClick={form.formState.isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </div>
  );
};
