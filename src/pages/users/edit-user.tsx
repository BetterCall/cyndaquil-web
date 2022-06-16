import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Loading } from "../../components/loading";
import { EDIT_USER, USER } from "../../queries/user.queries";
import {
  EditUserMutation,
  EditUserMutationVariables,
} from "../../__generated__/EditUserMutation";
import { EditUserInput } from "../../__generated__/globalTypes";
import { UserQuery, UserQueryVariables } from "../../__generated__/UserQuery";
import { UserForm } from "./user-form";

type IEditUser = {
  userId: string;
};

export const EditUser = () => {
  const { userId } = useParams<IEditUser>();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<EditUserInput>({
      mode: "all",
      defaultValues: {
        email: null,
        firstname: null,
        lastname: null,
        password: "",
      },
    });

  const { data } = useQuery<UserQuery, UserQueryVariables>(USER, {
    variables: {
      userId: +userId!,
    },
  });

  useEffect(() => {
    if (data?.user?.ok && data?.user?.result) {
      const { result } = data?.user;
      setValue("email", result.email);
      setValue("firstname", result.firstname);
      setValue("lastname", result.lastname);
    }
  });

  const [mutation, { loading }] = useMutation<
    EditUserMutation,
    EditUserMutationVariables
  >(EDIT_USER);

  const submit = async () => {
    if (loading) return;
    const { password, ...input } = getValues();

    const { data } = await mutation({
      variables: {
        userId: 1,
        input: {
          ...input,
          ...(password != "" && { password }),
        },
      },
    });

    if (data?.editUser.ok) {
      client.writeFragment({
        id: `User:${userId}`,
        fragment: gql`
          fragment EditedUser on User {
            email
            firstname
            lastname
          }
        `,
        data: {
          email: input.email,
          firstname: input.firstname,
          lastname: input.lastname,
        },
      });
      navigate(`/users/${userId}`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">Edit User Profile</h4>
      <UserForm
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
      />
    </div>
  );
};
