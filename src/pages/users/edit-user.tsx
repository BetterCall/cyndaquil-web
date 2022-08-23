import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { UserForm } from "../../components/users";
import { DashboardLayout } from "../../layouts/dashboard.layout";

import { EDIT_USER, USER } from "../../queries/user.queries";
import {
  EditUserMutation,
  EditUserMutationVariables,
} from "../../__generated__/EditUserMutation";
import { EditUserInput } from "../../__generated__/globalTypes";
import { UserQuery, UserQueryVariables } from "../../__generated__/UserQuery";

type IEditUser = {
  id: string;
};

export const EditUser = () => {
  const { id } = useParams<IEditUser>();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
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
      id: +id!,
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
        id: +id!,
        input: {
          ...input,
          ...(password != "" && { password }),
        },
      },
    });

    if (data?.editUser.ok) {
      client.writeFragment({
        id: `User:${id}`,
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
      navigate(`/users/${id}`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <DashboardLayout>
      <Header
        title={`${data?.user?.result?.firstname} ${data?.user?.result?.lastname}`}
        subtitle={data?.user?.result?.email}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/users/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <UserForm
          loading={loading}
          register={register}
          submit={handleSubmit(submit)}
          formState={formState}
        />
      </div>
    </DashboardLayout>
  );
};
