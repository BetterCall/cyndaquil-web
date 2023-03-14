import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { WorkOrderForm } from "../components";
import { useUpdateWorkOrder, useWorkOrder } from "../hooks";

type IUpdateWorkOrder = {
  id;
};

export const UpdateWorkOrder: React.FC = () => {
  const { id } = useParams<IUpdateWorkOrder>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useWorkOrder(+id!);
  const { form, loading, submit } = useUpdateWorkOrder({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("Le BI a été modifié avec succès");
    },
    onError: (msg) => toast.error(msg),
  });

  useEffect(() => {
    form.setValue("object", data?.workOrder?.result?.object);
    form.setValue("type", data?.workOrder?.result?.type);

    form.setValue("description", data?.workOrder?.result?.description);
    form.setValue("date", data?.workOrder?.result?.date);
    form.setValue("start", data?.workOrder?.result?.start);
    form.setValue("end", data?.workOrder?.result?.end);

    form.setValue("status", data?.workOrder?.result?.status);

    form.setValue("lat", data?.workOrder?.result?.lat);
    form.setValue("lng", data?.workOrder?.result?.lng);
    form.setValue("streetNumber", data?.workOrder?.result?.streetNumber);
    form.setValue("street", data?.workOrder?.result?.street);
    form.setValue("postal", data?.workOrder?.result?.postal);
    form.setValue("city", data?.workOrder?.result?.city);

    form.setValue("userId", data?.workOrder?.result?.userId);
    form.setValue("siteId", data?.workOrder?.result?.siteId);
    form.setValue("customerId", data?.workOrder?.result?.customerId);
  }, [data, form]);

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
        <WorkOrderForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={["siteId"]}
        />
      </div>
    </>
  );
};
