import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../button";

import { CustomerInput } from "../customers";
import { SiteInput } from "../sites/site-input";

interface IContactForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const ContactForm: React.FC<IContactForm> = ({
  form,
  loading,
  submit,
  disabledFields = [],
}) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Prénom</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("firstname", { required: "firstname required" })}
          placeholder="firstname"
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...form.register("lastname", { required: "lastname required" })}
          placeholder="lastname"
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Téléphone</p>
        <input
          className="w-full input"
          {...form.register("phone")}
          placeholder="phone"
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Email</p>
        <input
          className="w-full input"
          {...form.register("email", { required: "email required" })}
          placeholder="email"
        />
      </div>

      <div className="w-full p-3">
        <CustomerInput
          form={form}
          disabled={disabledFields.includes("customerId")}
        />
      </div>

      <div className="w-full p-3">
        <SiteInput form={form} disabled={disabledFields.includes("siteId")} />
      </div>

      <div className="w-full p-3">
        <Button
          actionText="Valider"
          canClick={form.formState.isValid}
          onClick={submit}
          loading={loading}
        />
      </div>
    </div>
  );
};
