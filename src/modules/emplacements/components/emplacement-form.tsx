import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";

import { SiteInput } from "../../sites/components/site-input";

interface IEmplacementForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const EmplacementForm: React.FC<IEmplacementForm> = ({
  form,
  loading,
  submit,
  disabledFields = [],
}) => {
  const setValue = (value) => {
    form.setValue("floor", value);
  };
  return (
    <div className="w-full">
      <div className="w-full mt-3">
        <SiteInput form={form} disabled={disabledFields.includes("siteId")} />
      </div>

      <div className="w-full mt-3">
        <EquipmentCategoriesInput
          form={form}
          disabled={disabledFields.includes("categoryId")}
        />
      </div>

      <div className="w-full mt-3">
        <p className="label">Batiment</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("building")}
          placeholder="Batiment"
        />
      </div>

      <div className="w-full mt-3">
        <p className="label">Entrée</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("entrance")}
          placeholder="Entrée"
        />
      </div>
      <div className="w-full mt-3">
        <p className="label">Etage</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("floor")}
          placeholder="Etage"
        />
        <div className="flex mt-2">
          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("rdc")}
          >
            RDC
          </div>

          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("1")}
          >
            1er
          </div>

          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("2")}
          >
            2 ème
          </div>

          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("3")}
          >
            3 ème
          </div>

          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("4")}
          >
            4 ème
          </div>
        </div>
        <div className="flex mt-2">
          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("-1")}
          >
            -1
          </div>

          <div
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded mr-2"
            onClick={() => setValue("-2")}
          >
            -2
          </div>
        </div>
      </div>

      <div className="w-full mt-3">
        <p className="label">Code</p>
        <p className="text-sm font-medium  text-gray-500 -mt-3 ">
          Code présent sur l'étiquette, si le site est en contrat
        </p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("code")}
          placeholder="Code de l'étiquette"
        />
      </div>

      <div className="w-full mt-3">
        <p className="label">Informations Complémentaires</p>
        <textarea
          className="w-full input"
          // @ts-ignore
          {...form.register("informations")}
          placeholder="informations complémentaires"
        />
      </div>

      <div className="w-full mt-3">
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
