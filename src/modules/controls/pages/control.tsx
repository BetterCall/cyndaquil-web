import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useControl } from "../hooks";

type IControl = {
  id: string;
};

export const Control: React.FC = () => {
  const { id } = useParams<IControl>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data } = useControl(+id!);

  return (
    <>
      <Header
        title={data?.control?.result?.id + "" || "Chargement..."}
        buttons={[
          {
            actionText: "Mettre à jour",
            bgColor: "indigo",
            textColor: "white",
            link: `/control/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container"></div>
    </>
  );
};
