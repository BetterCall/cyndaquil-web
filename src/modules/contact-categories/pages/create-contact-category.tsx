import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { ContactCategoryForm } from "../components";
import { useCreateContactCategory } from "../hooks";

export const CreateContactCategory: React.FC = () => {
  const { form, submit, loading } = useCreateContactCategory({
    defaultValues: {
      name: "",
    },
    onCompleted: () => {
      toast.success("La catégorie a été créée avec succès");
    },
  });

  return (
    <>
      <Header
        title="Nouvelle Catégorie"
        subtitle="Creer une nouvelle catégorie de contact"
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
        <ContactCategoryForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
