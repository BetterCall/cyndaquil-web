import React from "react";
import { useSearchParams } from "react-router-dom";

import { useCreateVisit } from "../hooks";

import { VisitForm } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { toast } from "react-toastify";

export const CreateVisit: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateVisit({
    defaultValues: parseSearchParams(params),
    onCompleted: () => {
      toast.success("Le Rendez-vous a été enregistré avec succès");
    },
  });

  return (
    <>
      <Header
        title={"Nouveau Rendez-vous"}
        subtitle="Rensisgner les informations du rendez-vous"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/visits`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <VisitForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
