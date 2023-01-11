import React from "react";
import { useCreateWorkOrder } from "../hooks";

import { WorkOrderForm } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const CreateWorkOrder: React.FC = () => {
  const { form, submit, loading } = useCreateWorkOrder({
    defaultValues: {
      emplacementIds: [],
    },
    onCompleted: () => {},
  });

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
