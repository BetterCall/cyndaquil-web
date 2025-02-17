import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";
import { useTaxes } from "../../taxes/hooks";

interface IBenefitForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const BenefitForm: React.FC<IBenefitForm> = ({
  form,
  loading,
  submit,
  disabledFields = [],
}) => {
  const { data } = useTaxes();
  return (
    <div className="w-full">
      <div className="w-full p-3">
        <p className="label">Nom</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("name", {
            required: "Le nom du service est requis",
          })}
          placeholder="Nom du service"
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="name"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Prix</p>
        <input
          className="w-full input"
          {...form.register("price", {
            required: "Le Prix du service est requis",
          })}
          placeholder="Prix HT "
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="price"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <div className="w-full p-3">
        <EquipmentCategoriesInput
          form={form}
          disabled={disabledFields.includes("categoryId")}
        />
      </div>

      <div className="w-full  p-3">
        <p className="mb-1.5 font-medium text-base text-coolGray-800">TVA</p>
        <div className="relative">
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
              fill="#8896AB"
            ></path>
          </svg>

          <select
            disabled={disabledFields.includes("taxeId")}
            {...form.register("taxeId", {
              required:
                "Definissez la taxe, celle-ci pourra etre adaptée par la suite",
            })}
            className="input appearance-none w-full"
          >
            {data?.taxes?.results?.map((taxe) => (
              <option value={taxe.id} key={`taxe-${taxe.id}`}>
                {taxe.name}
              </option>
            ))}
          </select>
        </div>
        <ErrorMessage
          errors={form.formState?.errors}
          name="taxeId"
          render={({ message }) => <p className="error-message">{message}</p>}
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
