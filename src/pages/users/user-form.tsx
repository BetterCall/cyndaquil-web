import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { EditUserInput } from "../../__generated__/globalTypes";

interface IUserForm {
  loading: boolean;
  register: UseFormRegister<EditUserInput>;
  submit: any;
  formState: FormState<EditUserInput>;
}

export const UserForm: React.FC<IUserForm> = ({
  loading,
  register,
  submit,
  formState: { isValid, errors },
}) => {
  return (
    <form
      className="grid max-w-screen-sm w-full gap-3 mt-5 mb-5 "
      onSubmit={submit}
    >
      <input
        {...register("firstname", { required: "firstname required" })}
        placeholder="firstname"
        className="input "
      />
      {errors.email?.message && <FormError message={errors.email?.message} />}

      <input
        {...register("lastname", { required: "lastname required" })}
        placeholder="lastname"
        className="input "
      />
      {errors.email?.message && <FormError message={errors.email?.message} />}

      <input
        {...register("email", { required: "email required" })}
        placeholder="email"
        className="input "
      />
      {errors.email?.message && <FormError message={errors.email?.message} />}

      <input className="input" placeholder="password" />
      <Button canClick={isValid} loading={loading} actionText="Valider" />
    </form>
  );
};
