import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useReference } from "../hooks";

type IRefParams = {
  id: string;
};

export const Reference: React.FC = () => {
  const { id } = useParams<IRefParams>();

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/references");
    }
  }, []);

  const { data, loading } = useReference(+id!);

  return (
    <>
      <Header
        title={"Référence"}
        subtitle={data?.reference?.result?.name ?? ""}
        buttons={[
          {
            actionText: "Nouvelle Référence",
            bgColor: "indigo",
            textColor: "white",
            link: `/reference/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container"></div>
    </>
  );
};
