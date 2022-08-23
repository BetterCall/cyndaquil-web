import { useQuery } from "@apollo/client";
import React from "react";
import { FloorsList } from "../../../components/floors";
import { useFloors } from "../../../hooks/useFloors";
import { FLOORS } from "../../../queries/floors.queries";
import {
  FloorsQuery,
  FloorsQueryVariables,
} from "../../../__generated__/FloorsQuery";

interface IFloorsProps {
  entranceId: number;
}

export const Floors: React.FC<IFloorsProps> = ({ entranceId }) => {
  const { data, loading } = useFloors(entranceId);
  return (
    <div className="overflow-x-auto ">
      <div className="py-4 inline-block min-w-full ">
        <div className="overflow-hidden">
          <div className="min-w-full ">
            <FloorsList
              entranceId={entranceId}
              floors={data?.floors?.results || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
