import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { cleanObject } from "../../../helpers/clean-object";
import { EquipmentFiltersInput } from "../../../__generated__/globalTypes";
import { Button } from "../../../components/button";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";
import { ReferenceInput } from "../../references/components";
import { UserInput } from "../../users/components";

export const SearchEquipmentsInput = (defaultValues) => {
  const navigate = useNavigate();
  const form = useForm<EquipmentFiltersInput>({
    defaultValues,
    mode: "all",
  });

  const onSearchSubmit = () => {
    const input = form.getValues();
    navigate({
      pathname: "/equipments",
      search: `?${createSearchParams(cleanObject(input))}`,
    });
  };

  return (
    <div className="search card">
      <form
        className="grid gap-3 w-full items-center  px-2"
        onSubmit={form.handleSubmit(onSearchSubmit)}
      >
        <div className=" ">
          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
            <div className="w-full md:w-1/3 p-3">
              <p className="label">Code Equipement</p>
              <input
                className="input w-full"
                type="text"
                placeholder="Code"
                {...form.register("code")}
              />
            </div>
            <div className="w-full md:w-1/3 p-3">
              <EquipmentCategoriesInput form={form} />
            </div>
            <div className="w-full md:w-1/3 p-3">
              <ReferenceInput form={form} />
            </div>
            <div className="w-full md:w-1/3 p-3">
              <p className="label">Code Emplacement</p>
              <input
                className="input w-full"
                type="text"
                placeholder="Code Emplacement"
                {...form.register("emplacementId")}
              />
            </div>
            <div className="w-full md:w-1/3 p-3">
              <UserInput inputName="takenById" label="Pris Par :" form={form} />
            </div>
          </div>
          <div className="flex justify-between  mt-4">
            <div></div>
            <Button canClick={true} actionText="Rechercher" loading={false} />
          </div>
        </div>
      </form>
    </div>
  );
};
