import React from "react";
import { useSearchParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { SiteForm } from "../components";

import { parseSearchParams } from "../../../helpers/clean-object";

import { useCreateSite } from "../hooks";

export const CreateSite: React.FC = () => {
  const [params] = useSearchParams();
  const { form, submit, loading } = useCreateSite({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: () => alert("site"),
  });

  return (
    <>
      <Header
        title="Nouvel Immeuble"
        subtitle="Creer une nouvelle copropriété"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/sites`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SiteForm
          form={form}
          loading={loading}
          submit={submit}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
