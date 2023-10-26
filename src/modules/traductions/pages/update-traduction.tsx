import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

import { TraductionForm } from "../components";
import { useTraductionById, useUpdateTraduction } from "../hooks";

type IUpdateTraduction = {
  id: string;
};

export const UpdateTraduction: React.FC = () => {
  const { id } = useParams<IUpdateTraduction>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useTraductionById(+id!);
  const { form, submit, loading } = useUpdateTraduction({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("Le fournisseur a été modifié avec succès");
    },
  });

  useEffect(() => {
    if (data?.traduction?.ok && data?.traduction?.result) {
      const { result } = data?.traduction;
      form.setValue("key", result.key);
      form.setValue("value", result.value);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Traductions"
        subtitle="Modifier la traduction"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/traductions`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TraductionForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
