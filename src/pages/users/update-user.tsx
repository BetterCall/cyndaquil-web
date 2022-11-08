import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { UserForm } from "../../components/users";

import { UPDATE_USER, USER } from "../../queries/user.queries";
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "../../__generated__/UpdateUserMutation";
import { UpdateUserInput } from "../../__generated__/globalTypes";
import { UserQuery, UserQueryVariables } from "../../__generated__/UserQuery";

type IUpdateUser = {
  id: string;
};

export const UpdateUser = () => {
  const { id } = useParams<IUpdateUser>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateUserInput>({
    mode: "all",
  });

  const { data, refetch } = useQuery<UserQuery, UserQueryVariables>(USER, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.user?.ok && data?.user?.result) {
      const { result } = data?.user;
      form.setValue("email", result.email);
      form.setValue("firstname", result.firstname);
      form.setValue("lastname", result.lastname);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const submit = async () => {
    if (loading) return;
    const { password, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          ...input,
          ...(password != "" && { password }),
        },
      },
    });

    if (data?.updateUser.ok) {
      await refetch();
      navigate(`/users/${id}`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
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
        <UserForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
