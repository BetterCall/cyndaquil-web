import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { ContractRowEmplacementsPreview } from "../../contract-row-emplacements/components";
import { CreateUploadModal } from "../../uploads/modals";
import { WorkOrderRowsPreview } from "../../work-order-rows/components";
import { useEmplacement } from "../hooks";
import { ChangeEquipment } from "../modals";

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
  console.log("data", data);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={"Emplacement"}
        subtitle={data?.emplacement?.result?.id + "" || "Chargement..."}
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
          <div className="element">
            <div className="card">
              <CardHeader
                title="Emplacement"
                subtitle="Informations Générales"
              />
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">code</p>

                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.code ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Catégorie</p>
                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.category?.name}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <p className="label">Adresse</p>
                <input
                  className="w-full input"
                  value={`${data?.emplacement?.result?.site?.streetNumber} ${data?.emplacement?.result?.site?.street}`}
                  disabled
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Ville</p>

                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.site?.city ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.site?.postal}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Batiment</p>

                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.building ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Entrée</p>
                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.entrance ?? "-"}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <p className="label">Etage</p>
                <input
                  className="w-full input"
                  value={data?.emplacement?.result?.floor}
                  disabled
                />
              </div>

              <div className="w-full mb-3">
                <p className="label">Informations</p>
                <textarea
                  className="w-full input"
                  value={data?.emplacement?.result?.informations ?? "-"}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Equipement" subtitle="Equipement sur place" />

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">
                      code {data?.emplacement?.result?.equipment?.id ?? "-"}{" "}
                    </p>

                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.equipment?.code ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Derniere verif</p>
                    <input
                      className="w-full input"
                      value={"12 mars 2022"}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Marque</p>

                    <input
                      className="w-full input"
                      value={
                        data?.emplacement?.result?.equipment?.reference?.brand
                          ?.name ?? "-"
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Model</p>
                    <input
                      className="w-full input"
                      value={
                        data?.emplacement?.result?.equipment?.reference?.name ??
                        "-"
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>

              <ChangeEquipment
                id={+id!}
                defaultValues={{
                  equipmentId: data?.emplacement?.result?.equipment?.id,
                }}
                onCompleted={async () => {
                  await refetch();
                  toast.success("Equipement modifié");
                }}
                onError={(err) => {
                  toast.error("Une erreur est survenue");
                }}
              />
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader
                title="Bons d'intervention"
                subtitle="Liste des 5 derniers Bon d'intervention"
              />
              <WorkOrderRowsPreview where={{ emplacementId: +id! }} />
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader
                title="Bon d'intervention"
                subtitle="Liste des 5 derniers Bon d'intervention"
              />

              <ContractRowEmplacementsPreview where={{ emplacementId: +id! }} />
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Emplacements, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Benefits,
                      objectId: +id!,
                    }}
                  >
                    <div className="btn">Nouveau Fichier</div>
                  </CreateUploadModal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
