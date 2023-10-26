import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { BillingReminderForm } from "../components";
import { useBillingReminder, useUpdateBillingReminder } from "../hooks";

type IUpdateBillingReminder = {
  id: string;
};

export const UpdateBillingReminder: React.FC = () => {
  const { id } = useParams<IUpdateBillingReminder>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/billing-reminders");
    }
  }, []);

  const { form, submit, loading } = useUpdateBillingReminder({
    id: +id!,
    onCompleted: () => {
      toast.success("La Relance a été modifiée avec succès");
    },
  });

  const { data } = useBillingReminder(+id!);

  useEffect(() => {
    if (data?.billingReminder?.ok && data?.billingReminder?.result) {
      const input = form.getValues();
      const { result } = data?.billingReminder;

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
        title="Relance Facture"
        subtitle="Mise à jour d'une relance"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/billing-reminder/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <BillingReminderForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
