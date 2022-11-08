import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { WorkOrderForm } from "../../components/work-orders";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { UpdateWorkOrderInput } from "../../__generated__/globalTypes";
import {
  WorkOrderQuery,
  WorkOrderQueryVariables,
} from "../../__generated__/WorkOrderQuery";
import {
  UPDATE_WORK_ORDER,
  WORK_ORDER,
} from "../../queries/work-orders.queries";
import {
  UpdateWorkOrderMutation,
  UpdateWorkOrderMutationVariables,
} from "../../__generated__/UpdateWorkOrderMutation";

type IUpdateWorkOrder = {
  id: string;
};

export const UpdateWorkOrder = () => {
  const { id } = useParams<IUpdateWorkOrder>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateWorkOrderInput>({
    mode: "all",
  });

  const { data } = useQuery<WorkOrderQuery, WorkOrderQueryVariables>(
    WORK_ORDER,
    {
      variables: {
        id: +id!,
      },
    }
  );

  useEffect(() => {
    if (data?.workOrder?.ok && data?.workOrder?.result) {
      const input = form.getValues();
      const { result } = data?.workOrder;
      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateWorkOrderMutation,
    UpdateWorkOrderMutationVariables
  >(UPDATE_WORK_ORDER, {
    refetchQueries: [{ query: WORK_ORDER, variables: { id: +id! } }],
    awaitRefetchQueries: true,
  });

  const submit = async () => {
    if (loading) return;
    const { lat, lng, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          lat: parseInt(lat + ""),
          lng: parseInt(lng + ""),
          ...input,
        },
      },
    });

    if (data?.updateWorkOrder.ok) {
      navigate(`/work-orders/${id}`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier le bon d'intervention"
        subtitle="Modifier le bon d'intervention"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-order`,
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
