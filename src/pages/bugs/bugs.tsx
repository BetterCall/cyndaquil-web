import React from "react";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

export const Bugs = () => {
  return (
    <>
      <Header
        title="Liste des bugs"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouvelle Appel",
            bgColor: "indigo",
            textColor: "white",
            link: "/bugs/create",
            icon: <SendIcon />,
          },
        ]}
      />
    </>
  );
};
