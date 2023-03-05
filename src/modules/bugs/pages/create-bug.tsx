import React from "react";

import { BugForm } from "../components";
import { useCreateBug } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";

export const CreateBug: React.FC = () => {
  const { form, submit, loading } = useCreateBug({
    onCompleted: () => {
      toast.success("La marque a été créée avec succès");
      form.reset();
    },
    onError: (msg) => {
      console.log(msg);
      toast.error(msg);
    },
  });

  return (
    <>
      <Header
        title="Nouveau Ticket"
        subtitle="Ouvrir un nouveau ticket, Rapporter un bug ou une amélioration"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/bugs`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <CardHeader title="Nouveau Ticket" />
          <BugForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
