import { useQuery } from "@apollo/client";
import { BUILDING } from "../queries/buildings.queries";
import { BuildingQuery, BuildingQueryVariables } from "../__generated__/BuildingQuery";


export const useBuilding = (id: number) => {
    return useQuery<
        BuildingQuery,
        BuildingQueryVariables
    >(BUILDING, {
        variables: {
            id,
        },
    });
}