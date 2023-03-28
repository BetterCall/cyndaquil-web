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
    <div className="">
      <div className="w-full mb-3">
        <ContactCategoriesInput form={form} />
      </div>

      <div className="flex ">
        <div className="w-1/2 mr-1">
          <div className="w-full mb-3">
            <p className="label">Prénom</p>
            <input
              placeholder="Prénom"
              {...form.register("firstname", {
                required: "firstname required",
              })}
              className="input w-full"
            />
          </div>
        </div>

        <div className="w-1/2 ml-1 ">
          <div className="w-full mb-3">
            <p className="label">Nom</p>
            <input
              className="input w-full"
              placeholder="Nom"
              type="text"
              {...form.register("lastname", {
                required: "lastname required",
              })}
            />
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="w-1/2 mr-1">
          <div className="w-full mb-3">
            <p className="label">Téléphone</p>
            <input
              placeholder="Téléphone"
              {...form.register("phone")}
              className="input w-full"
            />
          </div>
        </div>

        <div className="w-1/2 ml-1 ">
          <div className="w-full mb-3">
            <p className="label">Email</p>
            <input
              className="input w-full"
              placeholder="Email"
              type="text"
              {...form.register("email")}
            />
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className="w-1/2 mr-1">
          <div className="w-full mb-3">
            <CustomerInput
              form={form}
              disabled={disabledFields.some((ai) =>
                ["customerId", "siteId"].includes(ai)
              )}
            />
          </div>
        </div>

        <div className="w-1/2 ml-1 ">
          <div className="w-full mb-3">
            <SiteInput
              form={form}
              disabled={disabledFields.some((ai) =>
                ["customerId", "siteId"].includes(ai)
              )}
            />
          </div>
        </div>
      </div>

      <div className="w-full ">
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
