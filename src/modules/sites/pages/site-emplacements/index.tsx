import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../../components/cards";
import { Header } from "../../../../components/header";
import { SendIcon } from "../../../../components/icons";
import { Loading } from "../../../../components";
import {
  EmplacementForm,
  DuplicateEmplacementsForm,
} from "../../../emplacements/components";
import {
  useCreateEmplacement,
  useEmplacements,
} from "../../../emplacements/hooks";
import { useSite } from "../../hooks";
import { EmplacementPreview } from "../../../emplacements/modals";

type ISiteParams = {
  id: string;
};

export const SiteEmplacements: React.FC = () => {
  const { id } = useParams<ISiteParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const {
    data: siteData,
    loading: siteLoading,
    refetch: siteRefetch,
  } = useSite(+id!);
  const { data, refetch } = useEmplacements({ where: { siteId: +id! } });
  const {
    form,
    submit,
    loading: mLoading,
  } = useCreateEmplacement({
    defaultValues: { siteId: +id! },
    onCompleted: (id) => {
      toast.success("Emplacement créé avec succès");
      refetch();
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  const [buildings, setBuildings] = useState({});

  useEffect(() => {
    if (data?.emplacements?.results) {
      let emplacements = {};
      data?.emplacements?.results.map((emplacement) => {
        console.log(emplacement);

        if (!emplacements.hasOwnProperty(emplacement.building)) {
          emplacements[emplacement.building] = {};
        }
        if (
          !emplacements[emplacement.building].hasOwnProperty(
            emplacement.entrance
          )
        ) {
          emplacements[emplacement.building][
            emplacement.entrance ?? "Principal"
          ] = [];
        }

        emplacements[emplacement.building][
          emplacement.entrance ?? "Principal"
        ].push(emplacement);
      });

      console.log(emplacements);
      setBuildings({ ...emplacements });
    }
  }, [data?.emplacements?.results]);

  if (siteLoading) return <Loading />;
  return (
    <>
      <Header
        title="Immeuble"
        subtitle={siteData?.site?.result?.name || ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "red",
            textColor: "white",
            link: `/site/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="section">
          <div className="element">
            <div className="card mb-3">
              <CardHeader title="Raccourcis" />

              <p className="text-sm font-medium  text-gray-500 -mb-3 ">
                Dupliquer un batiment ou une entrée pour un site. <br />
              </p>

              <DuplicateEmplacementsForm siteId={+id!} refetch={refetch} />
            </div>
          </div>
          <div className="element">
            <div className="card mb-3">
              <CardHeader title="Nouvel Emplacement" />
              <EmplacementForm
                form={form}
                submit={submit}
                loading={mLoading}
                disabledFields={["siteId"]}
              />
            </div>
          </div>
        </div>
        {Object.keys(buildings).map((key, index) => {
          return (
            <>
              <div className="w-full card mb-3">
                <CardHeader title={`Batiment ${key}`} />
              </div>
              <div className="section">
                {Object.keys(buildings[key]).map((key2, index2) => {
                  let emplacements = buildings[key][key2];

                  console.log(key2);
                  return (
                    <div className="element">
                      <div className="card">
                        <CardHeader title={`Entrée ${key2}`} />
                        {emplacements.map((emplacement) => {
                          return (
                            <div className="">
                              <EmplacementPreview
                                emplacementId={emplacement.id}
                              >
                                <div className="flex ">
                                  <div className="w-1/2 mr-1">
                                    <div className="w-full mb-1">
                                      <p className="label">Etage</p>
                                      <input
                                        className="input w-full"
                                        type="text"
                                        value={emplacement.floor ?? ""}
                                        disabled
                                      />
                                    </div>
                                  </div>

                                  <div
                                    className="w-1/2 ml-1 "
                                    onClick={() => {}}
                                  >
                                    <div className="w-full mb-1">
                                      <p className="label">Catégorie</p>
                                      <input
                                        className="input w-full"
                                        type="text"
                                        value={emplacement.category?.name ?? ""}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex ">
                                  <div className="w-1/2 mr-1">
                                    <div className="w-full mb-3">
                                      <p className="label">Code Emplacement</p>
                                      <input
                                        className="input w-full"
                                        type="text"
                                        value={emplacement.code ?? "-"}
                                        disabled
                                      />
                                    </div>
                                  </div>

                                  <div
                                    className="w-1/2 ml-1 "
                                    onClick={() => {}}
                                  >
                                    <div className="w-full mb-3">
                                      <p className="label">Code Equipment</p>
                                      <input
                                        className="input w-full"
                                        type="text"
                                        value={
                                          emplacement.equipment?.code ?? "-"
                                        }
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>

                                {emplacement.informations?.lenght > 0 ? (
                                  <div className="w-full mb-3">
                                    <p className="label">Informations</p>
                                    <textarea
                                      className="input w-full"
                                      value={emplacement.informations ?? ""}
                                      disabled
                                    />
                                  </div>
                                ) : null}
                              </EmplacementPreview>
                              <div className="w-full flex items-center justify-center mb-4">
                                <div className="border-b-2 border-blue-500 w-1/2 "></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
