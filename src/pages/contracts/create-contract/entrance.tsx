import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { emplacementIdsVar } from "../../../apollo";
import { useFloors } from "../../../hooks/useFloors";

interface IEntranceProps {
  entranceId: number;
}

export const Entrance: React.FC<IEntranceProps> = ({ entranceId }) => {
  const { data } = useFloors(entranceId);
  const emplacementIds = useReactiveVar(emplacementIdsVar);

  const toggleEmplacementId = (id: number) => {
    var index = emplacementIds.indexOf(id);
    let newArray = [];
    console.log("index ,n", index);
    if (index === -1) {
      newArray = [...emplacementIds, id];
    } else {
      newArray = emplacementIds.filter((i) => i !== id);
    }

    console.log("newArray ,", newArray);
    emplacementIdsVar([...newArray]);
    console.log("emplacementIds ", emplacementIds);
  };

  return (
    <div>
      entrée {entranceId}
      {data?.floors?.results?.map((floor) => (
        <div>
          {floor.name}
          <div className="ml-4">
            {floor?.emplacements?.map((emplacement) => {
              // if (!emplacement.contractId) {
              return (
                <div>
                  <input
                    checked={emplacementIds.includes(emplacement.id)}
                    type="checkbox"
                    className="mr-2"
                    onClick={() => toggleEmplacementId(emplacement.id)}
                  />
                  {emplacement.id} {emplacement.category?.name}
                </div>
              );
              // }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
