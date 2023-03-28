import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";

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

  const { data, loading } = useControl(+id!);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={"Vérification"}
        subtitle={data?.control?.result?.id + ""}
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
