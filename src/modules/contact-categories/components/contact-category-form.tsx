import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { FormError } from "../../../components/form-error";

interface IContactCategoryForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const ContactCategoryForm: React.FC<IContactCategoryForm> = ({
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
        <div className="flex flex-wrap w-full">
          <div className="w-full">
            <div className=" h-full overflow-hidden bg-white rounded-md  ">
              <div className="flex flex-wrap  -m-3 mb-2">
                <div className="w-full p-3">
                  <p className="mb-1.5 font-medium text-base text-coolGray-800">
                    Nom de la catégorie
                  </p>
                  <input
                    className="w-full input"
                    type="text"
                    {...register("name", { required: "name required" })}
                    placeholder="Nom"
                  />
                  {errors.name?.message && <FormError />}
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
