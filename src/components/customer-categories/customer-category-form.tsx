import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "../button";
import { FormError } from "../form-error";

interface ICustomerCategoryForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const CustomerCategoryForm: React.FC<ICustomerCategoryForm> = ({
  loading,
  submit,
  form: {
    register,
    formState: { isValid, errors },
  },
}) => {
  return (
    <section className="bg-white py-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap w-full mb-8">
          <div className="w-full mb-8 pb-6 border-b border-coolGray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full p-2">
                <h2 className="text-coolGray-900 text-lg font-semibold">
                  Informations Générales
                </h2>
                <p className="text-xs text-coolGray-500 font-medium"></p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className=" h-full overflow-hidden bg-white rounded-md">
              <div className="flex flex-wrap  -m-3">
                <div className="w-full p-3">
                  <p className="mb-1.5 font-medium text-base text-coolGray-800">
                    Nom de la catégorie
                  </p>
                  <input
                    className="w-full input"
                    type="text"
                    {...register("name", { required: "name required" })}
                    placeholder="firstname"
                  />
                  {errors.name?.message && (
                    <FormError message={errors.name?.message} />
                  )}
                </div>
              </div>

              <Button
                canClick={isValid}
                loading={loading}
                actionText="Valider"
                onClick={submit}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
