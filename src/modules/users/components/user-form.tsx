import React from "react";
import { UseFormReturn } from "react-hook-form";
import { UserRoleSelect } from "./user-role-select";

interface IUserForm {
  loading: boolean;
  form: UseFormReturn<any, any>;
  submit: any;
}

export const UserForm: React.FC<IUserForm> = ({ loading, form, submit }) => {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap  -m-3">
          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Prénom
            </p>
            <input
              className="w-full input"
              type="text"
              {...form.register("firstname", { required: "name required" })}
              placeholder="firstname"
            />
          </div>

          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Nom
            </p>
            <input
              className="w-full input"
              type="text"
              {...form.register("lastname", { required: "name required" })}
              placeholder="lastname"
            />
          </div>

          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Email
            </p>
            <input
              className="w-full input"
              type="text"
              {...form.register("email", { required: "name required" })}
              placeholder="email"
            />
          </div>
          <div className="w-full  p-3">
            <UserRoleSelect form={form} />
          </div>
          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Mot de passe
            </p>
            <input
              className="w-full input"
              type="text"
              {...form.register("password", { required: "password required" })}
              placeholder="Mot de passe"
            />
          </div>

          <div className="w-full  p-3">
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              confirmation
            </p>
            <input
              className="w-full input"
              type="text"
              {...form.register("confirmation", {
                required: "confirmation required",
              })}
              placeholder="Confirmation Mot de passe"
            />
          </div>
        </div>
      </div>

      <div className="cardFooter">
        <div className="w-full md:w-1/2 px-2 mt-5">
          <div className="btn" onClick={submit}>
            {loading ? "Chargement" : "Valider"}
          </div>
        </div>
      </div>
    </>
  );
};
