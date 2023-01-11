import React from "react";

import { BrandForm } from "../components";
import { useCreateBrand } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const CreateBrand: React.FC = () => {
  const { form, submit, loading } = useCreateBrand({
    defaultValues: {
      name: "",
    },
    onCompleted: () => alert("ok"),
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
        <BrandForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
