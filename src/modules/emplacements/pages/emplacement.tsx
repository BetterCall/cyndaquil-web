import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { ContractRowEmplacementsPreview } from "../../contract-row-emplacements/components";
import { WorkOrderRowsPreview } from "../../work-order-rows/components";
import { WorkOrdersPreview } from "../../work-orders/components";
import { useEmplacement } from "../hooks";

type IParams = {
  id: string;
};

export const Emplacement: React.FC = () => {
  const { id } = useParams<IParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/emplacements");
    }
  }, []);

  const { data, loading, refetch } = useEmplacement(+id!);

  return (
    <>
      <Header
        title={data?.emplacement?.result?.id + "" || "Chargement..."}
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/emplacement/${data?.emplacement?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader
                title="Emplacement"
                subtitle="Informations Générales"
              />
              code : {data?.emplacement?.result?.code}
              <br />
              informations : {data?.emplacement?.result?.informations}
              <br />
              Immeuble : {data?.emplacement?.result?.site?.name}
              <br />
              Adresse : {data?.emplacement?.result?.site?.streetNumber}{" "}
              {data?.emplacement?.result?.site?.street}
              <br />
              Client : {data?.emplacement?.result?.site?.customer?.name}
              <br />
              Batiment : {data?.emplacement?.result?.building}
              <br />
              Etage : {data?.emplacement?.result?.floor}
              <br />
              Category : {data?.emplacement?.result?.category?.name}
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader title="Equipement" subtitle="Equipement sur place" />

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
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader
                title="Bons d'intervention"
                subtitle="Liste des 5 derniers Bon d'intervention"
              />
              <WorkOrderRowsPreview where={{ emplacementId: +id! }} />
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader
                title="Bon d'intervention"
                subtitle="Liste des 5 derniers Bon d'intervention"
              />

              <ContractRowEmplacementsPreview where={{ emplacementId: +id! }} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
