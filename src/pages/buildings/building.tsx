import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Floors } from "../entrances/components/floors";
import { RemoveEntranceBtn } from "../../components/entrances";
import { useBuilding } from "../../hooks/useBuiding";
import { Link } from "../../layouts/link";

type IBuildingParams = {
  buildingId: string;
  siteId: string;
};

export const Building = () => {
  const { siteId, buildingId } = useParams<IBuildingParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!buildingId) {
      navigate("/sites");
    }
  }, []);

  const { data, loading, refetch } = useBuilding(+buildingId!);

  return (
    <div>
      <div className="flex flex-col max-w-screen-2xl mx-auto mt-8 px-6">
        <Link
          className="text-gray-600 hover:underline"
          to={`/sites/${siteId}/buildings/${buildingId}/entrances/create`}
        >
          Ajouter une entrée&rarr;
        </Link>

        <div className="overflow-x-auto ">
          <div className="py-4 inline-block min-w-full  ">
            <div className="overflow-hidden flex flex-row w-full gap-3">
              {data?.building?.result?.entrances.map((entrance) => (
                <div
                  key={`entrance-${entrance.id}`}
                  className="w-full md:w-1/2"
                >
                  <div className="flex justify-between">
                    {/* <DuplicateEntranceBtn id={entrance.id} refetch={refetch} /> */}
                    <RemoveEntranceBtn
                      buildingId={+buildingId!}
                      id={entrance.id}
                    />
                  </div>
                  <div className="bg-gray-800 px-8 py-4">
                    <h2 className="title text-white">
                      Entrée : {entrance.name}{" "}
                    </h2>
                  </div>

                  <Floors entranceId={entrance.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
