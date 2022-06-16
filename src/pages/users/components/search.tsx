import React from "react";
import { useForm } from "react-hook-form";
import {
  useNavigate,
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FormError } from "../../../components/form-error";
interface ISearchForm {
  search: string;
}
export const SearchUserInput = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISearchForm>({
    defaultValues: { search: "" },
    mode: "onSubmit",
  });

  const onSearchSubmit = () => {
    const input = getValues();
    navigate({
      pathname: "/users/search",
      search: `?${createSearchParams(input)}`,
    });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  // @ts-ignore
  console.log("term", searchParams.get("term"));

  return (
    <div className="bg-gray-800 py-12 w-full flex flex-col px-5 items-center">
      <form
        className="grid gap-3 mt-5 w-full items-center max-w-screen-2xl"
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
