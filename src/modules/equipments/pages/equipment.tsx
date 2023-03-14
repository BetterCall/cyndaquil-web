import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmptyList } from "../../../components";
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

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Code</p>
                    <input
                      className="input w-full"
                      value={data?.equipment?.result?.code}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Type d'équipement</p>
                    <input
                      className="input w-full"
                      value={data?.equipment?.result?.category?.name}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mt-3">
                <p className="label">Informations</p>
                <input
                  className="input w-full"
                  value={
                    data?.equipment?.result?.informations ??
                    "Aucune information supplémentaire"
                  }
                  disabled
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Marque</p>
                    <input
                      className="input w-full"
                      value={
                        data?.equipment?.result?.reference?.brand?.name ?? ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Référence</p>
                    <input
                      className="input w-full"
                      value={data?.equipment?.result?.reference?.name ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
              {data?.equipment?.result?.emplacement?.siteId ? (
                <>
                  <div className="w-full mt-3">
                    <p className="label">Site</p>
                    <input
                      className="input w-full"
                      value={
                        data?.equipment?.result?.emplacement?.site?.name ?? ""
                      }
                      disabled
                    />
                  </div>

                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div className="w-full mt-3">
                        <p className="label">Batiment</p>
                        <input
                          className="input w-full"
                          value={
                            data?.equipment?.result?.emplacement?.building ?? ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div className="w-full mt-3">
                        <p className="label">Entrée</p>
                        <input
                          className="input w-full"
                          value={
                            data?.equipment?.result?.emplacement?.entrance ?? ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div className="w-full mt-3">
                        <p className="label">Etage</p>
                        <input
                          className="input w-full"
                          value={
                            data?.equipment?.result?.emplacement?.floor ?? ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div className="w-full mt-3">
                        <p className="label">N° Emplacement</p>
                        <input
                          className="input w-full"
                          value={
                            data?.equipment?.result?.emplacement?.code ?? ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyList text="" />
              )}
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader
                title="Controles"
                subtitle="Liste des 5 dernières vérifications"
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
