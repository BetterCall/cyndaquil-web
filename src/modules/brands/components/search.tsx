import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { cleanObject } from "../../../helpers/clean-object";
import { BrandsFiltersInput } from "../../../__generated__/globalTypes";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";

export const SearchBrands: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<BrandsFiltersInput>({
    defaultValues: { search: "" },
    mode: "all",
  });

  const onSearchSubmit = () => {
    const input = form.getValues();
    navigate({
      pathname: "/brands",
      search: `?${createSearchParams(cleanObject(input))}`,
    });
  };

  const search = form.watch("search");

  return (
    <div className="search card">
      <form
        className="grid gap-3 w-full items-center  px-2"
        onSubmit={form.handleSubmit(onSearchSubmit)}
      >
        <div className="flex row items-center justify-between">
          <div className="flex flex-1 row align-text-center items-center">
            <label
              htmlFor="search"
              className="mr-2 text-gray-200 hover:text-gray-300"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7 19.3L17 15.6C20.1 11.7 19.5 6 15.6 2.9C11.7 -0.2 5.99999 0.5 2.89999 4.3C-0.200006 8.2 0.499995 13.9 4.29999 17C7.59999 19.6 12.3 19.6 15.6 17L19.3 20.7C19.7 21.1 20.3 21.1 20.7 20.7C21.1 20.3 21.1 19.7 20.7 19.3ZM9.99999 17C6.09999 17 2.99999 13.9 2.99999 10C2.99999 6.1 6.09999 3 9.99999 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 9.99999 17Z"
                  fill="currentColor"
                ></path>
              </svg>
            </label>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!search || search.length < 3) {
                    toast.error(
                      "La recherche doit contenir au minimum 3 lettres"
                    );

                    return;
                  }
                  onSearchSubmit();
                }
              }}
              placeholder="Rechercher une Marque"
              autoComplete="off"
              {...form.register("search", {
                minLength: 3,
                required: false,
              })}
              className="input rounded border-0 w-full "
            />
          </div>
          <span></span>
        </div>

        <ErrorMessage
          errors={form.formState?.errors}
          name="search"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </form>
    </div>
  );
};
