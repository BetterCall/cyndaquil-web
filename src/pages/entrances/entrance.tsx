import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ENTRANCE } from "../../queries/entrances.queries";
import {
  EntranceQuery,
  EntranceQueryVariables,
} from "../../__generated__/EntranceQuery";
import { Floors } from "./components/floors";

type IEntranceParams = {
  siteId: string;
  buildingId: string;
  entranceId: string;
};

export const Entrance = () => {
  const { entranceId, siteId, buildingId } = useParams<IEntranceParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!entranceId) {
      navigate(`/sites/${siteId}/buildings/${buildingId}`);
    }
  }, []);
  const { data, loading } = useQuery<EntranceQuery, EntranceQueryVariables>(
    ENTRANCE,
    {
      variables: {
        id: +entranceId!,
      },
    }
  );

  return (
    <div>
      <div>Entrance : {data?.entrance?.result?.name} </div>
      {data?.entrance?.result?.id && (
        <Floors entranceId={data?.entrance?.result?.id} />
      )}
    </div>
  );
};
