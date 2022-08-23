import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { CreateWorkOrderForm } from "../../components/work-orders";
import { DashboardLayout } from "../../layouts/dashboard.layout";

export const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const onCompleted = (id: number) => {
    navigate(`/work-orders`, {
      replace: true,
    });
  };

  return (
    <DashboardLayout>
      <Header
        title={"Nouveau Bon d'intervention"}
        subtitle="Creer un nouveau bi"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-orders`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CreateWorkOrderForm onCompleted={onCompleted} />
      </div>
    </DashboardLayout>
  );
};
