import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { ControlForm } from "../components";
import { useCreateControl } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { toast } from "react-toastify";
import { parseSearchParams } from "../../../helpers/clean-object";
import { CardHeader } from "../../../components/cards";

export const CreateControl: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  console.log("params", parseSearchParams(params));

  const { form, submit, loading } = useCreateControl({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: () => {
      toast.success("La verification a été saisie avec succès");
      const equipmentId = form.getValues("equipmentId");
      navigate(`/equipment/${equipmentId}`);
    },
    onError: (msg) => toast.error(msg),
  });

  console.log("form ", form.getValues());
  const { equipmentId } = form.watch();
  console.log("equipmentId watched", equipmentId);

  return (
    <>
      <Header
        title="Nouvelle Vérification"
        subtitle="Saisir une nouvelle vérification"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/controls`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <ControlForm
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
