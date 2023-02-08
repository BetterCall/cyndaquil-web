import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { TransferForm } from "../components";
import { useUpdateTransfer, useTransfer } from "../hooks";

type IUpdateTransfer = {
  id;
};

export const UpdateTransfer: React.FC = () => {
  const { id } = useParams<IUpdateTransfer>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useTransfer(+id!);
  const { form, loading, submit } = useUpdateTransfer({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("Le transfert a été modifié avec succès");
    },
  });

  useEffect(() => {
    form.setValue("iban", data?.transfer?.result?.iban);
    form.setValue("amount", data?.transfer?.result?.amount);
    form.setValue("comment", data?.transfer?.result?.comment);
    form.setValue("customerId", data?.transfer?.result?.customer?.id);
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
            link: `/transfer/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TransferForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={["customerId"]}
        />
      </div>
    </>
  );
};
