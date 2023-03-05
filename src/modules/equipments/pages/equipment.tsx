import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { ControlsPreview } from "../../controls/components";
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

  const { data, loading, refetch } = useEquipment({ id: +id! });
  console.log({ data });

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

      <div className="main-container">
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader
                title="Equipement"
                subtitle="Informations Générales"
              />
              code : {data?.equipment?.result?.code}
              <br />
              informations : {data?.equipment?.result?.informations}
              <br />
              marque : {data?.equipment?.result?.reference?.brand?.name}
              <br />
              reference : {data?.equipment?.result?.reference?.name}
              <br />
              site : {data?.equipment?.result?.emplacement?.site?.name}
              <br />
              {data?.equipment?.result?.emplacement?.building}
              <br />
              {data?.equipment?.result?.emplacement?.floor}
              <br />
              {data?.equipment?.result?.emplacement?.site?.name}
              <br />
              {data?.equipment?.result?.emplacement?.site?.name}
              <br />
              {data?.equipment?.result?.category?.name}
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader
                title="Controles"
                subtitle="Liste des 5 dernieres Verfications"
              />

              <ControlsPreview where={{ equipmentId: +id! }} limit={5} />

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() =>
                      navigate(`/control/create?equipmentId=${id}`)
                    }
                  >
                    Nouvel Verification
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
