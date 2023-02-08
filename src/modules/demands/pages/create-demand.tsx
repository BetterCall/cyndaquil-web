import React from "react";
import { useSearchParams } from "react-router-dom";

import { DemandForm } from "../components";
import { useCreateDemand } from "../hooks";

import { parseSearchParams } from "../../../helpers/clean-object";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";
import { toast } from "react-toastify";

export const CreateDemand: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateDemand({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: () => toast.success("Le demande a été créé avec succès"),
  });

  return (
    <>
      <Header
        title="Créer un Nouvelle Demande"
        subtitle="Elle sera transmise à la personne concernée"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/demands",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <DemandForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
