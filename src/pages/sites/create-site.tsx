import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { CreateSiteForm } from "../../components/sites/create-site-form";
import { DashboardLayout } from "../../layouts/dashboard.layout";

export const CreateSite = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");

  const onCompleted = (id: number) => {
    navigate(`/sites/${id}`, {
      replace: true,
    });
  };

  return (
    <DashboardLayout>
      <Header
        title="Nouvel Immeuble"
        subtitle="Creer une nouvelle copropriété"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/sites`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CreateSiteForm
          customerId={customerId ? +customerId : undefined}
          onCompleted={onCompleted}
        />
      </div>
    </DashboardLayout>
  );
};
