import React from "react";
import { useSearchParams } from "react-router-dom";

import { useCreateTransfer } from "../hooks";

import { TransferForm } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { toast } from "react-toastify";

export const CreateTransfer: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateTransfer({
    defaultValues: parseSearchParams(params),
    onCompleted: () => {
      toast.success("Le Transfert a été enregistré avec succès");
    },
  });

  return (
    <>
      <Header
        title={"Rembousement"}
        subtitle="Saisissez les informations du remboursement"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/transfers`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TransferForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
