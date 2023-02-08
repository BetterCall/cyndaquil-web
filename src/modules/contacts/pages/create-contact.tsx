import React from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";

import { ContactForm } from "../components";
import { useCreateContact } from "../hooks";

export const CreateContact: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateContact({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: () => {
      toast.success("Le contact a été créé avec succès");
    },
  });

  return (
    <>
      <Header
        title="Liste des Contrats"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/contacts",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <ContactForm
            loading={loading}
            submit={submit}
            form={form}
            disabledFields={Object.keys(parseSearchParams(params))}
          />
        </div>
      </div>
    </>
  );
};
