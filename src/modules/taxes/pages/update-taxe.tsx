import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

// IMPORTANT
// value: parseFloat((value + "").replace(",", ".")),

import { TaxeForm } from "../components";
import { useTaxe, useUpdateTaxe } from "../hooks";

type IUpdateTaxe = {
  id: string;
};

export const UpdateTaxe: React.FC = () => {
  const { id } = useParams<IUpdateTaxe>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useTaxe(+id!);
  const { form, submit, loading } = useUpdateTaxe({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("La taxe a été modifié avec succès");
    },
  });

  useEffect(() => {
    if (data?.taxe?.ok && data?.taxe?.result) {
      const input = form.getValues();
      const { result } = data?.taxe;

      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Nouvelle Taxe"
        subtitle="Creer une nouvelle taxe"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxes`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TaxeForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
