import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { PaymentForm } from "../components";
import { usePayment, useUpdatePayment } from "../hooks";

type IUpdatePayment = {
  id: string;
};

export const UpdatePayment: React.FC = () => {
  const { id } = useParams<IUpdatePayment>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/payments");
    }
  }, []);

  const { form, submit, loading } = useUpdatePayment({
    id: +id!,
    onCompleted: () => {
      toast.success("Le Paiement a été modifié avec succès");
    },
  });

  const { data } = usePayment(+id!);

  useEffect(() => {
    if (data?.payment?.ok && data?.payment?.result) {
      const input = form.getValues();
      const { result } = data?.payment;

      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  return (
    <>
      <Header
        title="Mis à jour Paiement"
        subtitle="Mise à jour d'un paiement"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/payments`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <PaymentForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
