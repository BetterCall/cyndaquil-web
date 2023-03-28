import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";

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

  const { data, loading, error } = useBrand(+id!);

  if (loading) {
    return <Loading />;
  }

  if (data?.brand?.result === null || error || data?.brand?.ok === false) {
    return <div>Erreur</div>;
  }

  return (
    <>
      <Header
        title="Marque"
        subtitle={`Marque : ${data?.brand?.result?.name}`}
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
