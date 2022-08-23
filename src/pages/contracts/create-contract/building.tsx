import React from "react";
import { useBuilding } from "../../../hooks/useBuiding";
import { Entrance } from "./entrance";

interface IBuilding {
  id: number;
}

export const Building: React.FC<IBuilding> = ({ id }) => {
  const { data } = useBuilding(id);
  return (
    <div className="ml-4">
      {data?.building?.result?.entrances?.map((entrance) => (
        <Entrance entranceId={entrance.id} />
      ))}
    </div>
  );
};
