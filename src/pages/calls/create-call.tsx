import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CallForm } from "../../components/calls";

import { CREATE_CALL } from "../../queries/calls.queries";

import { CreateCallInput } from "../../__generated__/globalTypes";
import {
  CreateCallMutation,
  CreateCallMutationVariables,
} from "../../__generated__/CreateCallMutation";
import { Header } from "../../components/header";
import { DashboardIcon } from "../../components/icons";
import { parseSearchParams } from "../../helpers/clean-object";

export const CreateCall = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const form = useForm<CreateCallInput>({
    mode: "all",
    defaultValues: {
      ...parseSearchParams(params),
    },
  });

  const [mutation, { loading }] = useMutation<
    CreateCallMutation,
    CreateCallMutationVariables
  >(CREATE_CALL);

  const submit = async () => {
    if (loading) return;
    const { siteId, customerId, ...input } = form.getValues();

    const { data, errors } = await mutation({
      variables: {
        input: {
          ...(siteId && { siteId: +siteId }),
          ...(customerId && { customerId: +customerId }),
          ...input,
        },
      },
    });

    if (data?.createCall.ok) {
      navigate(`/calls`, {
        replace: true,
      });
    }
  };

  return (
    <>
      <Header
        title="Nouvel Appel "
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
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
