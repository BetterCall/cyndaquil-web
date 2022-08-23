import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CallForm } from "../../components/calls";

import { CREATE_CALL } from "../../queries/calls.queries";

import { CreateCallInput } from "../../__generated__/globalTypes";
import {
  CreateCallMutation,
  CreateCallMutationVariables,
} from "../../__generated__/CreateCallMutation";
import { DashboardLayout } from "../../layouts/dashboard.layout";
import { Header } from "../../components/header";
import { DashboardIcon } from "../../components/icons";

export const CreateCall = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<CreateCallInput>({
      mode: "all",
      defaultValues: {
        additionalInformations: "",
        customerId: null,
        siteId: null,
      },
    });

  const [mutation, { loading }] = useMutation<
    CreateCallMutation,
    CreateCallMutationVariables
  >(CREATE_CALL);

  const submit = async () => {
    if (loading) return;
    const { siteId, customerId, ...input } = getValues();

    console.log({
      ...(siteId && { siteId: +siteId }),
      ...(customerId && { customerId: +customerId }),
      ...input,
    });

    const { data, errors } = await mutation({
      variables: {
        input: {
          ...(siteId && { siteId: +siteId }),
          ...(customerId && { customerId: +customerId }),
          ...input,
        },
      },
    });

    console.log("errors ", errors);
    if (data?.createCall.ok) {
      navigate(`/calls`, {
        replace: true,
      });
    }
  };

  return (
    <DashboardLayout>
      <Header
        title="Nouveau Contact"
        subtitle="Créer un nouveau contact"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/calls",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CallForm
          setValue={setValue}
          loading={loading}
          register={register}
          submit={handleSubmit(submit)}
          formState={formState}
        />
      </div>
    </DashboardLayout>
  );
};
