import React from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {} from "../../../components/cards";
import { Header } from "../../../components/header";

import { DashboardIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { EmplacementForm } from "../components";
import { useCreateEmplacement } from "../hooks";

export const CreateEmplacement: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateEmplacement({
    defaultValues: parseSearchParams(params),
    onCompleted: () => toast.success("ok"),
    onError: (message) => toast.error(message),
  });

  return (
    <>
      <Header
        title="Emplacement"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/emplacements",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <EmplacementForm
            form={form}
            submit={submit}
            loading={loading}
            disabledFields={Object.keys(parseSearchParams(params))}
          />
        </div>
      </div>
    </>
  );
};
