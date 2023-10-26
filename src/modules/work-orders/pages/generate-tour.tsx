import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const GenerateTour: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Génération de tournée"
        subtitle="Créer une tournée"
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
      <div className="main-container"></div>
    </>
  );
};
