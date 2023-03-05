import React from "react";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
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
    onError: (msg) => {
      toast.error(msg);
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
        <div className="card">
          <ContactCategoryForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
