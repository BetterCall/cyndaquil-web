import React from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";

import {} from "../../../components/cards";
import { FormHeader } from "../../../components/form";
import { parseSearchParams } from "../../../helpers/clean-object";
import { PriceForm } from "../components";
import { useCreatePrice } from "../hooks";
import { toast } from "react-toastify";

export const CreatePrice: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreatePrice({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: (id: number) => {
      toast.success("Le prix spécial a été créé avec succès");
      // wait for 2 seconds
      setTimeout(() => {
        window.location.href = `/prices`;
      }, 1500);
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  return (
    <>
      <Header
        title="Règle de tarification"
        subtitle="Nouvelle Règle de tarification"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/prices",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <FormHeader
            title="Informations Générales"
            subtitle="Ajouter un nouveau contact"
          />

          <PriceForm
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
