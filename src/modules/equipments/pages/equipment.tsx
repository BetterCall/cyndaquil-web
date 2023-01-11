import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useEquipment } from "../hooks";

type IEquipmentParams = {
  id: string;
};

export const Equipment: React.FC = () => {
  const { id } = useParams<IEquipmentParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/equipments");
    }
  }, []);

  const { data, loading, refetch } = useEquipment(+id!);
  return (
    <>
      <Header
        title={"" + data?.equipment?.result?.id ?? ""}
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/equipment/${data?.equipment?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">to do</div>
    </>
  );
};
