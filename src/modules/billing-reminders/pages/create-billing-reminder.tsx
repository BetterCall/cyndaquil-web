import React from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";

import { BillingReminderForm } from "../components";
import { useCreateBillingReminder } from "../hooks";

export const CreateBillingReminder: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateBillingReminder({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: (id) => {
      toast.success("La Relance a été créée avec succès");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  // if invoice Id 
  // get client 
  // get site 
  // get contact

  

  return (
    <>
      <Header
        title="Relance"
        subtitle="Saississez les informations de la relance"
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
          <CardHeader title="Saisir une relance" />
          <BillingReminderForm
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
