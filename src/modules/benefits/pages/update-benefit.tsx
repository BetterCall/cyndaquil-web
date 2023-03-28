import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { BenefitForm } from "../components";

import { useBenefit } from "../hooks/useBenefit";
import { useUpdateBenefit } from "../hooks";
import { toast } from "react-toastify";

type IUpdateBenefitParams = {
  id: string;
};

export const UpdateBenefit = () => {
  const { id } = useParams<IUpdateBenefitParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/benefits");
    }
  }, []);

  const { data: qData, refetch } = useBenefit(+id!);
  const { form, submit, loading } = useUpdateBenefit({
    id: +id!,
    onCompleted: () => {
      toast.success("Le service a été modifié avec succès");
      refetch();
    },
  });

  useEffect(() => {
    if (qData) {
      form.setValue("name", qData.benefit?.result?.name);
      form.setValue("price", qData.benefit?.result?.price);
    }
  }, [qData]);

  return (
    <>
      <Header
        title="Service"
        subtitle="Modifier un service"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/benefits`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <BenefitForm form={form} loading={loading} submit={submit} />
        </div>
      </div>
    </>
  );
};
