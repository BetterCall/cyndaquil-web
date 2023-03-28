import React from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
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
        title="Contact"
        subtitle="Saississez les informations d'un nouveau Contact"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/contacts",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <CardHeader title="Créer un contact" />
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
