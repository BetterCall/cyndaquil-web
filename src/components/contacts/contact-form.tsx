import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";

import { Button } from "../button";
import { FormError } from "../form-error";

import {
  CreateContactInput,
  EditContactInput,
} from "../../__generated__/globalTypes";
import { CustomerInput } from "../customers";
import { SiteInput } from "../sites/site-input";

interface IContactForm {
  customerId?: number;
  siteId?: number;
  loading: boolean;
  register: UseFormRegister<any>;
  submit: any;
  formState: FormState<CreateContactInput> | FormState<EditContactInput>;
  setValue: any;
}

export const ContactForm: React.FC<IContactForm> = ({
  customerId,
  siteId,
  register,
  formState: { isValid, errors },
  setValue,
}) => {
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Prénom</p>
        <input
          className="w-full input"
          {...register("firstname", { required: "firstname required" })}
          placeholder="firstname"
        />
        {errors.firstname?.message && (
          <FormError message={errors.firstname?.message} />
        )}
      </div>

      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          {...register("lastname", { required: "lastname required" })}
          placeholder="lastname"
        />
        {errors.lastname?.message && (
          <FormError message={errors.lastname?.message} />
        )}
      </div>

      <div className="w-full p-3">
        <p className="label">Téléphone</p>
        <input
          className="w-full input"
          {...register("phone", { required: "phone required" })}
          placeholder="phone"
        />
        {errors.phone?.message && <FormError message={errors.phone?.message} />}
      </div>

      <div className="w-full p-3">
        <p className="label">Email</p>
        <input
          className="w-full input"
          {...register("email", { required: "email required" })}
          placeholder="email"
        />
        {errors.email?.message && <FormError message={errors.email?.message} />}
      </div>

      <div className="w-full p-3">
        <CustomerInput
          defaultValue={customerId}
          setValue={setValue}
          canSelectAddress={false}
        />
      </div>

      <div className="w-full p-3">
        <SiteInput
          setValue={setValue}
          defaultValue={siteId}
          canSelectAddress={false}
        />
      </div>
    </div>
  );
};
