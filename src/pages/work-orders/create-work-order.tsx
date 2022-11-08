import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CreateWorkOrderInput } from "../../__generated__/globalTypes";
import {
  CreateWorkOrderMutation,
  CreateWorkOrderMutationVariables,
} from "../../__generated__/CreateWorkOrderMutation";
import { CREATE_WORK_ORDER } from "../../queries/work-orders.queries";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { WorkOrderForm } from "../../components/work-orders";

export const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const onCompleted = (id: number) => {
    navigate(`/work-orders`, {
      replace: true,
    });
  };

  const form = useForm<CreateWorkOrderInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateWorkOrderMutation,
    CreateWorkOrderMutationVariables
  >(CREATE_WORK_ORDER, {});

  const submit = async () => {
    if (loading) return;
    const { lat, lng, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        input: {
          lat: +lat,
          lng: +lng,
          ...input,
        },
      },
    });

    if (data?.createWorkOrder.ok && data?.createWorkOrder.id) {
      onCompleted(data?.createWorkOrder?.id);
    }
  };

  return (
    <>
      <Header
        title={"Nouveau Bon d'intervention"}
        subtitle="Creer un nouveau bi"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-orders`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <WorkOrderForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
