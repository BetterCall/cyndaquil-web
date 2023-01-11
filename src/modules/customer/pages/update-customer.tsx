import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

import { CustomerForm } from "../components";
import { useCustomer, useUpdateCustomer } from "../hooks";

type IUpdateCustomer = {
  id: string;
};

export const UpdateCustomer: React.FC = () => {
  const { id } = useParams<IUpdateCustomer>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { form, submit, loading } = useUpdateCustomer({
    id: +id!,
    onCompleted: () => alert("ok"),
  });

  const { data, refetch } = useCustomer(+id!);

  useEffect(() => {
    if (data?.customer?.ok && data?.customer?.result) {
      const { result } = data?.customer;
      form.setValue("name", result.name);
      form.setValue("email", result.email);
      form.setValue("phone", result.phone);
      form.setValue("categoryId", result.category?.id);

      form.setValue("streetNumber", result.streetNumber);
      form.setValue("street", result.street);
      form.setValue("city", result.city);
      form.setValue("postal", result.postal);
      form.setValue("lat", result.lat);
      form.setValue("lng", result.lng);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title={data?.customer?.result?.name ?? ""}
        subtitle="Modifier les informations du client"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/customer/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
