import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { VisitForm } from "../components";
import { useUpdateVisit, useVisit } from "../hooks";

type IUpdateVisit = {
  id;
};

export const UpdateVisit: React.FC = () => {
  const { id } = useParams<IUpdateVisit>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useVisit(+id!);
  const { form, loading, submit } = useUpdateVisit({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("La visite a été modifié avec succès");
    },
  });

  useEffect(() => {
    form.setValue("object", data?.visit?.result?.object);
    form.setValue("description", data?.visit?.result?.description);
    form.setValue("customerId", data?.visit?.result?.customer?.id);

    form.setValue("date", data?.visit?.result?.date);
    form.setValue("start", data?.visit?.result?.start);
    form.setValue("status", data?.visit?.result?.status);
  }, [data, form]);

  return (
    <>
      <Header
        title="Modifier le Rendez-vous"
        subtitle="Rensisgner les nouvelles informations du rendez-vous"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/visit/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <VisitForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={["customerId"]}
        />
      </div>
    </>
  );
};
