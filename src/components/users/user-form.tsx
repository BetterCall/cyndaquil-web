import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { EditUserInput } from "../../__generated__/globalTypes";
import { Card } from "../cards";
import { FormHeader } from "../form";

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
    <Card>
      <FormHeader
        title="Informations Générales"
        subtitle="Update your billing details and address."
      />
      <div className="w-full">
        <div className="flex flex-wrap pb-3 -m-3">
          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Prénom
            </p>
            <input
              className="w-full input"
              type="text"
              {...register("firstname", { required: "name required" })}
              placeholder="firstname"
            />
            {errors.firstname?.message && (
              <FormError message={errors.firstname?.message} />
            )}
          </div>

          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Nom
            </p>
            <input
              className="w-full input"
              type="text"
              {...register("lastname", { required: "name required" })}
              placeholder="lastname"
            />
            {errors.lastname?.message && (
              <FormError message={errors.lastname?.message} />
            )}
          </div>

          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Email
            </p>
            <input
              className="w-full input"
              type="text"
              {...register("email", { required: "name required" })}
              placeholder="email"
            />
            {errors.email?.message && (
              <FormError message={errors.email?.message} />
            )}
          </div>

          <Button
            onClick={submit}
            canClick={isValid}
            loading={loading}
            actionText="Valider"
          />
        </div>
      </div>
    </Card>
  );
};
