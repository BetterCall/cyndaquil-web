import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

import { ReferenceForm } from "../components";
import { useReference, useUpdateReference } from "../hooks";

type IUpdateReference = {
  id: string;
};

export const UpdateReference: React.FC = () => {
  const { id } = useParams<IUpdateReference>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { form, loading, submit } = useUpdateReference({
    id: +id!,
    onCompleted: () => alert("ok"),
  });

  const { data } = useReference(+id!);

  useEffect(() => {
    if (data?.reference?.ok && data?.reference?.result) {
      const { result } = data?.reference;
      form.setValue("name", result.name);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier la Référence"
        subtitle="Modifier les informations de cette référance produit"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/references`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <ReferenceForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
