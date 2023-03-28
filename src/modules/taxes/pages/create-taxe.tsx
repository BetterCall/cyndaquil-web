import React from "react";
import { useCreateTaxe } from "../hooks";

import { TaxeForm } from "../components";
import { SendIcon } from "../../../components/icons";
import { Header } from "../../../components/header";
import { toast } from "react-toastify";

export const CreateTaxe: React.FC = () => {
  const { form, submit, loading } = useCreateTaxe({
    defaultValues: {},
    onCompleted: () => {
      toast.success("La taxe a été créée avec succès");
    },
  });

  return (
    <>
      <Header
        title="Taxe"
        subtitle="Creer une nouvelle Taxe"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxes`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TaxeForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
