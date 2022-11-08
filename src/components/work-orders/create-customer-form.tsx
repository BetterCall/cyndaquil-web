import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CreateWorkOrderInput } from "../../__generated__/globalTypes";
import {
  CreateWorkOrderMutation,
  CreateWorkOrderMutationVariables,
} from "../../__generated__/CreateWorkOrderMutation";
import { CREATE_WORK_ORDER } from "../../queries/work-orders.queries";
import { WorkOrderForm } from "./work-order-form";

interface ICreateWorkOrderForm {
  onCompleted: any;
}

export const CreateWorkOrderForm: React.FC<ICreateWorkOrderForm> = ({
  onCompleted,
}) => {
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

    if (data?.createWorkOrder.ok) {
      onCompleted(data?.createWorkOrder?.id);
    }
  };

  return <WorkOrderForm loading={loading} submit={submit} form={form} />;
};
