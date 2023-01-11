import React from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { ReferenceForm } from "../components";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useCreateReference } from "../hooks";

export const CreateReference: React.FC = ({}) => {
  const { form, submit, loading } = useCreateReference({
    defaultValues: {
      name: "",
    },
    onCompleted: () => alert("ok"),
  });

  return (
    <>
      <Header
        title="Nouvelle Référence"
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
        <ReferenceForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
