import React from "react";
import { useNavigate } from "react-router-dom";
import { CreateCustomerForm } from "../../components/customers";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { DashboardLayout } from "../../layouts/dashboard.layout";

export const CreateCustomer = () => {
  const navigate = useNavigate();
  const onCompleted = (id: number) => {
    navigate(`/customers`, {
      replace: true,
    });
  };

  return (
    <DashboardLayout>
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
        <CreateCustomerForm onCompleted={onCompleted} />
      </div>
    </DashboardLayout>
  );
};
