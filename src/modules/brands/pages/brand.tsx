import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useBrand } from "../hooks";

type IBrand = {
  id: string;
};

export const Brand = () => {
  const { id } = useParams<IBrand>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data } = useBrand(+id!);

  return (
    <>
      <Header
        title={data?.brand?.result?.name || "Chargement..."}
        subtitle={`${data?.brand?.result?.referencesCount} référence${
          (data?.brand?.result?.referencesCount ?? 0) > 1 ? "s" : ""
        }`}
        buttons={[
          {
            actionText: "Mettre à jour",
            bgColor: "indigo",
            textColor: "white",
            link: `/brand/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container"></div>
    </>
  );
};
