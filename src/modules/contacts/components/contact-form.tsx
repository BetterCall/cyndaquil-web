import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { ContactCategoriesInput } from "../../contact-categories/components";
import { CustomerInput } from "../../customer/components";

import { SiteInput } from "../../sites/components/site-input";

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
        <ContactCategoriesInput form={form} />
      </div>

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

      <div className="w-full px-3">
        <CustomerInput
          form={form}
          disabled={disabledFields.some((ai) =>
            ["customerId", "siteId"].includes(ai)
          )}
        />
      </div>

      <div className="w-full px-3">
        <SiteInput
          form={form}
          disabled={disabledFields.some((ai) =>
            ["customerId", "siteId"].includes(ai)
          )}
        />
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
