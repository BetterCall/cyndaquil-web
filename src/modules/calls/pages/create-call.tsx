import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CallForm } from "../components";
import { useCreateCall } from "../hooks";

import { parseSearchParams } from "../../../helpers/clean-object";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";

export const CreateCall: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateCall({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: () =>
      navigate(`/calls`, {
        replace: true,
      }),
  });

  return (
    <>
      <Header
        title="Nouvel Appel "
        subtitle="Créer un nouveau contact"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/calls",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CallForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
