import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { cleanObject } from "../../../helpers/clean-object";
import { EquipmentFiltersInput } from "../../../__generated__/globalTypes";
import { Button } from "../../../components/button";

export const SearchEquipmentsInput = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm<EquipmentFiltersInput>({
    defaultValues: { categoryId: null },
    mode: "onSubmit",
  });

  const onSearchSubmit = () => {
    const input = getValues();
    navigate({
      pathname: "/equipments",
      search: `?${createSearchParams(cleanObject(input))}`,
    });
  };

  return (
    <div className="search card">
      <form
        className="grid gap-3 w-full items-center  px-2"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <div className=" ">
          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
            <div className="w-full md:w-1/3 p-3">
              <p className="label">Code Postal</p>
              <input
                className="input w-full"
                type="text"
                placeholder="Code Postal"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <Button canClick={true} actionText="Rechercher" loading={false} />
          </div>
        </div>
      </form>
    </div>
  );
};
