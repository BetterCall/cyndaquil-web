import React from "react";
import { toast } from "react-toastify";

import { useCreateTraduction } from "../hooks";

import { TraductionForm } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const CreateTraduction: React.FC = () => {
  const { form, submit, loading } = useCreateTraduction({
    defaultValues: {},
    onCompleted: () => {
      toast.success("La traduction a été créé avec succès");
    },
  });

  return (
    <>
      <Header
        title="Traductions"
        subtitle="Ajouter une nouvelle traduction"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/traductions`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TraductionForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
