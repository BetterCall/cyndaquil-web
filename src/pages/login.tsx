import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../contants";
import { LOGIN_MUTATION } from "../queries/user.queries";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<any>(null);

  const [loginMutation, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION);

  const onSubmit = async () => {
    if (loading) return;
    setError(null);
    const input = getValues();
    const { data } = await loginMutation({
      variables: { input },
    });
    if (data?.login.ok && data?.login.token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, data.login.token);
      authTokenVar(data.login.token);
      isLoggedInVar(true);
    }
    setError(data?.login?.error);
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Cyndaquil | Connexion</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium  text-left text-3xl mb-5">
          Welcome Back
        </h4>
        <form
          className="grid gap-3 mt-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", { required: "Email required" })}
            placeholder="Email"
            className="input "
          />
          {errors.email?.message && (
            <FormError message={errors.email?.message} />
          )}
          <input
            type="password"
            {...register("password", { required: "Password required" })}
            placeholder="Password"
            className="input "
          />
          {errors.password?.message && (
            <FormError message={errors.password?.message} />
          )}
          <Button actionText="Connexion" loading={loading} canClick={isValid} />
          {error && <FormError message={error} />}
        </form>
      </div>
    </div>
  );
};
