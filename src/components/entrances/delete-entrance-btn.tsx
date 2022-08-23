import { useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { BUILDING } from "../../queries/buildings.queries";
import { DELETE_ENTRANCE } from "../../queries/entrances.queries";
import {
  DeleteEntranceMutation,
  DeleteEntranceMutationVariables,
} from "../../__generated__/DeleteEntranceMutation";

interface IDeleteEntranceBtnProps {
  id: number;
  buildingId: number;
}

export const DeleteEntranceBtn: React.FC<IDeleteEntranceBtnProps> = ({
  id,
  buildingId,
}) => {
  const client = useApolloClient();
  const [mutation, { loading }] = useMutation<
    DeleteEntranceMutation,
    DeleteEntranceMutationVariables
  >(DELETE_ENTRANCE, { variables: { id } });

  const remove = async () => {
    if (loading) return;

    const { data } = await mutation();
    if (data?.deleteEntrance.ok) {
      const queryResult = client.readQuery({
        query: BUILDING,
        variables: { id: +buildingId! },
      });

      client.writeQuery({
        query: BUILDING,
        variables: { id: +buildingId! },
        data: {
          building: {
            ...queryResult.building,
            result: {
              ...queryResult.building.result,
              entrances: [
                ...queryResult.building.result.entrances.filter(
                  (entrance: any) => entrance.id !== id
                ),
              ],
            },
          },
        },
      });
    }
  };

  return <div onClick={remove}>Delete</div>;
};
