import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { cleanObject } from "../../../helpers/clean-object";
import { EmplacementsFiltersInput } from "../../../__generated__/globalTypes";
import { Button } from "../../../components/button";
import { SiteInput } from "../../sites/components/site-input";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";

export const SearchEmplacementsInput = (defaultValues) => {
  const navigate = useNavigate();
  const form = useForm<EmplacementsFiltersInput>({
    defaultValues,
    mode: "all",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const onSearchSubmit = () => {
    const input = form.getValues();
    navigate({
      pathname: "/emplacements",
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
              <SiteInput form={form} />
            </div>

            <div className="w-full md:w-1/3 p-3">
              <EquipmentCategoriesInput form={form} />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div></div>
            <Button canClick={true} actionText="Rechercher" loading={false} />
          </div>
        </div>
      </form>
    </div>
  );
};
