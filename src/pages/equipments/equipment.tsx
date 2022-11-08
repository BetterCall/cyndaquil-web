import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { EQUIPMENT } from "../../queries/equipments.queries";
import {
  EquipmentQuery,
  EquipmentQueryVariables,
} from "../../__generated__/EquipmentQuery";

type IEquipmentParams = {
  id: string;
};

export const Equipment = () => {
  const { id } = useParams<IEquipmentParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/equipments");
    }
  }, []);

  const { data, loading, refetch } = useQuery<
    EquipmentQuery,
    EquipmentQueryVariables
  >(EQUIPMENT, {
    variables: {
      id: +id!,
    },
  });
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
            link: `/equipments/${data?.equipment?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0"></div>
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0"></div>
        </div>
      </div>
    </>
  );
};
