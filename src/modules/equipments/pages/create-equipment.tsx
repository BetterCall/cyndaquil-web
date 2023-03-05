import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateEquipment } from "../hooks";
import { parseSearchParams } from "../../../helpers/clean-object";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { EquipmentForm } from "../components";
import { CardHeader } from "../../../components/cards";

export const CreateEquipment: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { form, submit, loading } = useCreateEquipment({
    defaultValues: {
      ...parseSearchParams(params),
    },
    onCompleted: (id) => {
      toast.success("L'equipement a été enregistré avec succès");
      navigate(`/equipment/${id}`, {
        replace: true,
      });
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  return (
    <>
      <Header
        title="Nouvel equipement"
        subtitle="Saisir un nouvel equipeement"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/equipments`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <CardHeader
            title="Nouvel equipement"
            subtitle="Collez l'etiquette avant de remplir le formulaire"
          />
          <EquipmentForm
            form={form}
            loading={loading}
            submit={submit}
            disabledFields={Object.keys(parseSearchParams(params))}
          />
        </div>
      </div>
    </>
  );
};
