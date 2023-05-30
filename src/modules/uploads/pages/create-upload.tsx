import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { UploadForm } from "../components";

import { parseSearchParams } from "../../../helpers/clean-object";

import { toast } from "react-toastify";
import { useCreateUpload } from "../hooks";

export const CreateUpload: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { form, submit, loading } = useCreateUpload({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: (id) => {
      toast.success("Le Site a été enregistré avec succès");
      navigate(`/site/${id}`, {
        replace: true,
      });
    },
  });

  return (
    <>
      <Header
        title="Immeuble"
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
        <UploadForm
          form={form}
          loading={loading}
          submit={submit}
          disabledFields={Object.keys(parseSearchParams(params))}
        />
      </div>
    </>
  );
};
