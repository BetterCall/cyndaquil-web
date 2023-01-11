import React from "react";
import { useCreateSupplier } from "../hooks";

import { SupplierForm } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const CreateSupplier: React.FC = () => {
  const { form, submit, loading } = useCreateSupplier({
    defaultValues: {},
    onCompleted: () => alert("ok"),
  });

  return (
    <>
      <Header
        title="Nouveau Fournisseur"
        subtitle="Ajouter un nouveau fournisseur"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/suppliers`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SupplierForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
