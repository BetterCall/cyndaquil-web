import React from "react";

import { PaymentForm } from "../components";
import { useCreatePayment } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../../../helpers/clean-object";
import { toast } from "react-toastify";

export const CreatePayment: React.FC = () => {
  const [params] = useSearchParams();
  const { form, submit, loading } = useCreatePayment({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: () => {
      toast.success("Le Paiement a été enregistré avec succès");
    },
  });

  return (
    <>
      <Header
        title="Nouveau Paiement"
        subtitle="Saisir un paiement"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/brands`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <PaymentForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
