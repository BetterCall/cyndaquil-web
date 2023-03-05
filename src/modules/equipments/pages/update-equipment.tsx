import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { EquipmentForm } from "../components";
import { useEquipment, useUpdateEquipment } from "../hooks";

type IUpdateEquipment = {
  id: string;
};

export const UpdateEquipment = () => {
  const { id } = useParams<IUpdateEquipment>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useEquipment({ id: +id! });

  const { form, submit, loading } = useUpdateEquipment({
    id: +id!,
    onCompleted: () => {
      toast.success("La marque a été modifié avec succès");
      refetch();
    },
    onError: (msg) => toast.error(msg),
  });

  useEffect(() => {
    console.log(data);
    if (data?.equipment?.ok && data?.equipment?.result) {
      const input = form.getValues();
      const { result } = data?.equipment;

      console.log(result);

      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  return (
    <>
      <Header
        title={`Modifier :  `}
        subtitle="Modifier une marque"
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
          <CardHeader title="Modifier le control d'un appareil" />
          <EquipmentForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
