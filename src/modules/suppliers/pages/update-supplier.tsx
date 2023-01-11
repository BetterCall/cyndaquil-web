import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

import { SupplierForm } from "../components";
import { useSupplier, useUpdateSupplier } from "../hooks";

type IUpdateSupplier = {
  id: string;
};

export const UpdateSupplier: React.FC = () => {
  const { id } = useParams<IUpdateSupplier>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { form, submit, loading } = useUpdateSupplier({
    id: +id!,
    onCompleted: () => alert("ok"),
  });
  const { data } = useSupplier(+id!);

  useEffect(() => {
    if (data?.supplier?.ok && data?.supplier?.result) {
      const { result } = data?.supplier;
      form.setValue("name", result.name);
      form.setValue("lat", result.lat);
      form.setValue("lng", result.lng);
      form.setValue("postal", result.postal);
      form.setValue("street", result.street);
      form.setValue("streetNumber", result.streetNumber);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier le fournisseur"
        subtitle="Modifier les informations du fournisseur"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/suppliers`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SupplierForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
