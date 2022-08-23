import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateContactForm } from "../../components/contacts";
import { Header } from "../../components/header";
import { DashboardIcon } from "../../components/icons";
import { useLazyCustomer } from "../../hooks/useCustomer";
import { useLazySite } from "../../hooks/useSite";
import { DashboardLayout } from "../../layouts/dashboard.layout";

export const CreateContact = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const siteId = searchParams.get("siteId");

  const onCompleted = (id: number) => {
    navigate(`/contact/${id}`, {
      replace: true,
    });
  };

  return (
    <DashboardLayout>
      <Header
        title="Liste des Contrats"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/contacts",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CreateContactForm
          siteId={siteId ? +siteId : undefined}
          customerId={customerId ? +customerId : undefined}
          onCompleted={onCompleted}
        />
      </div>
    </DashboardLayout>
  );
};
