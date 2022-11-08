import { gql, useFragment_experimental, useQuery } from "@apollo/client";

import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import { RemoveBuildingModal } from "../../../components/buildings/remove-modal";
import {
  CreateEmplacement,
  RemoveEmplacement,
} from "../../../components/emplacements";
import { FloorsList } from "../../../components/floors";
import { RemoveFloorModal } from "../../../components/floors/remove-modal";
import { SITE_EMPLACEMENTS } from "../../../queries/sites.queries";
import {
  SiteEmplacementsQuery,
  SiteEmplacementsQueryVariables,
} from "../../../__generated__/SiteEmplacementsQuery";
import { BuildingSelector } from "./building-selector";
import { CompleteButton } from "./complete-button";
import { Empty } from "./empty";
import { EntranceSelector } from "./entrance-selector";
import { FloorSelector } from "./floor-selector";
import {
  CreateBuildingModal,
  CreateEntranceModal,
  CreateFloorModal,
} from "./modals";

type ICreateEntranceParams = {
  id: string;
};

export const SiteInit = () => {
  const { id } = useParams<ICreateEntranceParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const { data, error, refetch, networkStatus, loading } = useQuery<
    SiteEmplacementsQuery,
    SiteEmplacementsQueryVariables
  >(SITE_EMPLACEMENTS, { variables: { id: +id! } });
  const [buildingId, setBuildingId] = useState<number>(-1);
  const [entranceId, setEntranceId] = useState<number>(-1);
  const [floorId, setFloorId] = useState<number>(-1);

  const { data: building } = useFragment_experimental({
    fragment: gql`
      fragment BuildingFragment on Building {
        id
        name

        entrances {
          id
          name
        }
      }
    `,
    fragmentName: "BuildingFragment",
    from: {
      __typename: "Building",
      id: buildingId,
    },
  });

  const { data: entrance } = useFragment_experimental({
    fragment: gql`
      fragment EntranceFragment on Entrance {
        id
        name
        floors {
          id
          name
          type
          order

          emplacements {
            id

            category {
              id
              name
            }
            contractRows {
              id
              contract {
                id
                status
              }
            }
          }
        }
      }
    `,
    fragmentName: "EntranceFragment",
    from: {
      __typename: "Entrance",
      id: entranceId,
    },
  });

  const calledOnce = React.useRef(false);
  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    if (data) {
      resetBuildingId();
    }
    calledOnce.current = true;
  }, [data]);

  const { result } = data?.siteEmplacements || {};

  const resetBuildingId = () => {
    try {
      // @ts-ignore
      setBuildingId(data?.siteEmplacements?.result?.buildings[0]?.id || -1);
    } catch (error) {
      setBuildingId(-1);
    }
  };

  useEffect(() => {
    try {
      // @ts-ignore
      setEntranceId(building?.entrances[0]?.id || -1);
    } catch (error) {
      setEntranceId(-1);
    }
    // @ts-ignore
  }, [buildingId]);

  useEffect(() => {
    try {
      // @ts-ignore
      setFloorId(entrance?.floors[0]?.id || -1);
    } catch (error) {
      setFloorId(-1);
    }
    // @ts-ignore
  }, [entranceId]);

  return (
    <>
      <div className="mb-8 p-8 bg-indigo-500  ">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <h2 className="text-3xl text-white font-bold">{result?.name}</h2>
            <p className="text-indigo-50">informations supplémentaires</p>
          </div>
          <div className="w-full lg:w-1/3 px-4 flex items-center"></div>
        </div>
      </div>
      <div className="main-container ">
        <section className="py-8">
          <div className="  ">
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0 ">
                <section className="  ">
                  <div className="flex items-center w-full justify-between">
                    <div className="w-full lg:w-auto flex items-center mb-4 lg:mb-0">
                      <h2 className="text-2xl font-bold">Batiments</h2>
                    </div>

                    <CreateBuildingModal siteId={+id!} refetch={refetch} />
                  </div>
                </section>

                <div className={`bg-white p-3 rounded shadow`}>
                  {!result?.buildings?.length && (
                    <Empty message="Ajouter un premier Batiment" />
                  )}

                  <ul>
                    {result?.buildings?.map((building) => (
                      <div
                        onClick={() => setBuildingId(building.id)}
                        className={`custom-row
                       ${
                         building.id == buildingId
                           ? " bg-indigo-50"
                           : " hover:bg-indigo-50"
                       }`}
                        key={`buildingSelector-${building.id}`}
                      >
                        <BuildingSelector
                          id={building.id}
                          siteId={+id!}
                          name={building.name}
                          isSelected={building.id == buildingId}
                          refetch={refetch}
                        />
                        <RemoveBuildingModal
                          id={building.id}
                          siteId={+id!}
                          refetch={async () => {
                            await refetch();
                            resetBuildingId();
                          }}
                        />
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <>
                  {buildingId !== -1 && (
                    <section className="  ">
                      <div className="flex items-center w-full justify-between">
                        <div className="w-full lg:w-auto flex items-center mb-4 lg:mb-0">
                          <h2 className="text-2xl font-bold">Entrée</h2>
                        </div>

                        <CreateEntranceModal
                          buildingId={buildingId}
                          refetch={refetch}
                        />
                      </div>
                    </section>
                  )}

                  <div
                    className={`${
                      buildingId !== -1 ? "bg-white p-3 rounded shadow" : ""
                    }`}
                  >
                    {
                      // @ts-ignore
                      buildingId !== -1 && !entrance?.floors?.length && (
                        <Empty message="Ajouter un premiere entrée" />
                      )
                    }
                    <ul>
                      {
                        // @ts-ignore
                        building?.entrances?.map((entrance) => {
                          const isSelected = entrance.id == entranceId;
                          return (
                            <div
                              onClick={() => setEntranceId(entrance.id)}
                              className={`custom-row ${
                                isSelected
                                  ? " bg-indigo-50"
                                  : " hover:bg-indigo-50"
                              }`}
                              key={`entranceSelector-${entrance.id}`}
                            >
                              <EntranceSelector
                                id={entrance.id}
                                name={entrance.name}
                                isSelected={entrance.id == entranceId}
                                refetch={refetch}
                              />
                            </div>
                          );
                        })
                      }
                    </ul>
                  </div>
                </>
              </div>
            </div>

            <div className="flex flex-wrap -mx-4 ">
              <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0 ">
                {entranceId !== -1 && (
                  <section className="  ">
                    <div className="flex items-center w-full justify-between">
                      <div className="w-full lg:w-auto flex items-center mb-4 lg:mb-0">
                        <h2 className="text-2xl font-bold mb-1">Etages</h2>
                      </div>
                      <CreateFloorModal
                        entranceId={entranceId}
                        refetch={refetch}
                      />
                    </div>
                  </section>
                )}

                <div
                  className={`${
                    entranceId !== -1 ? "bg-white p-3 rounded shadow" : ""
                  }`}
                >
                  <FloorsList
                    entranceId={entranceId}
                    floors={(entrance as any)?.floors || []}
                    refetch={refetch}
                    select={setFloorId}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {(entrance as any)?.floors?.map((floor, index) => {
                          const isSelected = floorId === floor.id;
                          return (
                            <Draggable
                              key={`stage-${floor.id}`}
                              draggableId={floor.id + ""}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => setFloorId(floor.id)}
                                  className={` p-3 cursor-pointer items-center mb-1 justify-between rounded  bg-white text-gray-500
${isSelected ? "f bg-indigo-50 " : " hover:bg-indigo-50 "}`}
                                >
                                  <div
                                    className="flex items-center w-full justify-between"
                                    key={`floorSelector-${floor.id}`}
                                  >
                                    <FloorSelector
                                      id={floor.id}
                                      name={floor.name}
                                      isSelected={floor.id == floorId}
                                      refetch={refetch}
                                    />

                                    <RemoveFloorModal
                                      id={floor.id}
                                      refetch={async () => {
                                        await refetch();
                                      }}
                                    />
                                  </div>

                                  <div
                                    className={` flex-col justify-start items-start pb-4 `}
                                  >
                                    {floor?.emplacements?.map((emplacement) => (
                                      <div className="px-2 flex  items-center mb-1 justify-between">
                                        <div className="flex">
                                          <span className="mr-3">
                                            <svg
                                              className="text-indigo-100"
                                              width="18"
                                              height="16"
                                              viewBox="0 0 18 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M14.8332 3.83333H13.9998V3C13.9998 2.33696 13.7364 1.70107 13.2676 1.23223C12.7988 0.763392 12.1629 0.5 11.4998 0.5H3.1665C2.50346 0.5 1.86758 0.763392 1.39874 1.23223C0.929896 1.70107 0.666504 2.33696 0.666504 3V3V13C0.666504 13.663 0.929896 14.2989 1.39874 14.7678C1.86758 15.2366 2.50346 15.5 3.1665 15.5H14.8332C15.4962 15.5 16.1321 15.2366 16.6009 14.7678C17.0698 14.2989 17.3332 13.663 17.3332 13V6.33333C17.3332 5.67029 17.0698 5.03441 16.6009 4.56557C16.1321 4.09673 15.4962 3.83333 14.8332 3.83333ZM3.1665 2.16667H11.4998C11.7209 2.16667 11.9328 2.25446 12.0891 2.41074C12.2454 2.56702 12.3332 2.77899 12.3332 3V3.83333H3.1665C2.94549 3.83333 2.73353 3.74554 2.57725 3.58926C2.42097 3.43298 2.33317 3.22101 2.33317 3C2.33317 2.77899 2.42097 2.56702 2.57725 2.41074C2.73353 2.25446 2.94549 2.16667 3.1665 2.16667V2.16667ZM15.6665 10.5H14.8332C14.6122 10.5 14.4002 10.4122 14.2439 10.2559C14.0876 10.0996 13.9998 9.88768 13.9998 9.66667C13.9998 9.44565 14.0876 9.23369 14.2439 9.07741C14.4002 8.92113 14.6122 8.83333 14.8332 8.83333H15.6665V10.5ZM15.6665 7.16667H14.8332C14.1701 7.16667 13.5342 7.43006 13.0654 7.8989C12.5966 8.36774 12.3332 9.00363 12.3332 9.66667C12.3332 10.3297 12.5966 10.9656 13.0654 11.4344C13.5342 11.9033 14.1701 12.1667 14.8332 12.1667H15.6665V13C15.6665 13.221 15.5787 13.433 15.4224 13.5893C15.2661 13.7455 15.0542 13.8333 14.8332 13.8333H3.1665C2.94549 13.8333 2.73353 13.7455 2.57725 13.5893C2.42097 13.433 2.33317 13.221 2.33317 13V5.35833C2.60089 5.45251 2.8827 5.50042 3.1665 5.5H14.8332C15.0542 5.5 15.2661 5.5878 15.4224 5.74408C15.5787 5.90036 15.6665 6.11232 15.6665 6.33333V7.16667Z"
                                                fill="currentColor"
                                              ></path>
                                            </svg>
                                          </span>
                                          {emplacement?.category?.name}
                                        </div>
                                        <RemoveEmplacement
                                          refetch={refetch}
                                          emplacementId={emplacement.id}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </div>
                    )}
                  </FloorsList>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                {floorId !== -1 && (
                  <section className="  ">
                    <div className="flex items-center w-full justify-between">
                      <div className="w-full lg:w-auto flex items-center mb-4 lg:mb-0">
                        <h2 className="text-2xl font-bold mb-1">Equipements</h2>
                      </div>
                    </div>
                  </section>
                )}

                {floorId !== -1 && <CreateEmplacement floorId={floorId!} />}
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex items-center justify-center">
          <CompleteButton siteId={+id!} />
        </div>
      </div>
    </>
  );
};
