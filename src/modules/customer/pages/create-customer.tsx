import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { CustomerForm } from "../components";
import { useCreateCustomer } from "../hooks";

export const CreateCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { form, loading, submit } = useCreateCustomer({
    defaultValues: {
      name: "",
    },
    onCompleted: (id) => {
      toast.success("Le client a été créé avec succès");
      navigate(`/customer/${id}`, {
        replace: true,
      });
    },
  });

  return (
    <>
      <Header
        title="Nouveau Client"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/customers",
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
