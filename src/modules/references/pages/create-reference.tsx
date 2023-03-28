import React from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { ReferenceForm } from "../components";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useCreateReference } from "../hooks";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";

export const CreateReference: React.FC = ({}) => {
  const { form, submit, loading } = useCreateReference({
    defaultValues: {
      name: "",
    },
    onCompleted: () => {
      toast.success("La référence a été créée avec succès");
    },
  });

  return (
    <>
      <Header
        title="Référence"
        subtitle="Ajouter une nouvelle référence produit"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/references`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <CardHeader
            title="Nouvelle Référence"
            subtitle="Créer une nouvelle référence produit"
          />
          <ReferenceForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
