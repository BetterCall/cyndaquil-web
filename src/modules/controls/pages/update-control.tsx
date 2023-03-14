import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { ControlForm } from "../components";
import { useControl, useUpdateControl } from "../hooks";

type IUpdateControl = {
  id: string;
};

export const UpdateControl = () => {
  const { id } = useParams<IUpdateControl>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useControl(+id!);

  const { form, submit, loading } = useUpdateControl({
    id: +id!,
    onCompleted: () => {
      toast.success("La marque a été modifié avec succès");
      refetch();
    },
    onError: (msg) => toast.error(msg),
  });

  useEffect(() => {
    console.log(data);
    if (data?.control?.ok && data?.control?.result) {
      const input = form.getValues();
      const { result } = data?.control;

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
        subtitle="Modifier une vérification"
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
          <ControlForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
