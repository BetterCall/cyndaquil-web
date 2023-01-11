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
        title="Brand"
        subtitle=" c"
        buttons={[
          {
            actionText: "Nouvelle Marque",
            bgColor: "indigo",
            textColor: "white",
            link: `/brand/create`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container"></div>
    </>
  );
};
