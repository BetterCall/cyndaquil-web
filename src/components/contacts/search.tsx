import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { cleanObject } from "../../helpers/clean-object";
import { ContactFiltersInput } from "../../__generated__/globalTypes";
import { FormError } from "../form-error";

interface ISearchForm {
  search: string;
}
export const SearchContactInput = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ContactFiltersInput>({
    defaultValues: { search: "" },
    mode: "onSubmit",
  });

  const onSearchSubmit = () => {
    const input = getValues();
    navigate({
      pathname: "/contacts",
      search: `?${createSearchParams(cleanObject(input))}`,
    });
  };

  return (
    <div className="bg-gray-800 py-12 w-full flex flex-col px-5 items-center">
      <form
        className="grid gap-3 w-full items-center max-w-screen-2xl"
        onSubmit={handleSubmit(onSearchSubmit)}
        placeholder="search"
      >
        <input
          autoComplete="off"
          {...register("search", {
            minLength: 3,
            required: true,
          })}
          className="input rounded border-0 "
        />
        {errors.search && (
          <FormError message={"Faites une recherche avec minimum 3 lettres"} />
        )}
      </form>
    </div>
  );
};
