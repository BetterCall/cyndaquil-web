import React from "react";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const CreateInvoice = () => {
  return (
    <>
      <Header
        title="Nouvelle Facture"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/invoices`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container "></div>
    </>
  );
};
