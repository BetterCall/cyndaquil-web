import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cleanObject } from "../../../helpers/clean-object";
interface ISearchForm {
  search: string;
}
export const SearchUserInput: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<ISearchForm>({
    defaultValues: { search: "" },
    mode: "all",
  });

  const onSearchSubmit = () => {
    const input = form.getValues();
    navigate({
      pathname: "/users/search",
      search: `?${createSearchParams(cleanObject(input))}`,
    });
  };

  const search = form.watch("search");

  // @ts-ignore
  return (
    <div className="search card">
      <form
        className="grid gap-3 w-full items-center max-w-screen-2xl"
        onSubmit={form.handleSubmit(onSearchSubmit)}
        placeholder="search"
      >
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!search || search.length < 3) {
                toast.error("La recherche doit contenir au minimum 3 lettres");
                return;
              }
              onSearchSubmit();
            }
          }}
          autoComplete="off"
          {...form.register("search", {
            minLength: 3,
            required: true,
          })}
          className="input rounded border-0 "
        />

        <ErrorMessage
          errors={form.formState?.errors}
          name="search"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </form>
    </div>
  );
};
