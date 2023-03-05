import React from "react";

import { BrandForm } from "../components";
import { useCreateBrand } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";

export const CreateBrand: React.FC = () => {
  const { form, submit, loading } = useCreateBrand({
    defaultValues: {
      name: "",
    },
    onCompleted: () => {
      toast.success("La marque a été créée avec succès");
    },
  });

  return (
    <>
      <Header
        title="Nouvelle Marque"
        subtitle="Creer une nouvelle copropriété"
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
        <div className="card">
          <CardHeader title="Nouvelle Marque" />
          <BrandForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
