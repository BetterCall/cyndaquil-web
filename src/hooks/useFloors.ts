import { useQuery } from "@apollo/client";
import { FLOORS } from "../queries/floors.queries";
import { FloorsQuery, FloorsQueryVariables } from "../__generated__/FloorsQuery";

export const useFloors = (entranceId: number) => {
    return useQuery<FloorsQuery, FloorsQueryVariables>(
        FLOORS,
        {
            variables: {
                entranceId,
            },
        }
    );
}