import React from "react";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { UploadCategoryForm } from "../components";
import { useCreateUploadCategory } from "../hooks";

export const CreateUploadCategory: React.FC = () => {
  const { form, submit, loading } = useCreateUploadCategory({
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
        title="Type de upload"
        subtitle="Creer un Nouveau Type de Upload"
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
          <UploadCategoryForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
