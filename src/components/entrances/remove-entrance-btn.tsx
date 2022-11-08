import { useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { BUILDING } from "../../queries/buildings.queries";
import { REMOVE_ENTRANCE } from "../../queries/entrances.queries";
import {
  RemoveEntranceMutation,
  RemoveEntranceMutationVariables,
} from "../../__generated__/RemoveEntranceMutation";

interface IRemoveEntranceBtnProps {
  id: number;
  buildingId: number;
}

export const RemoveEntranceBtn: React.FC<IRemoveEntranceBtnProps> = ({
  id,
  buildingId,
}) => {
  const client = useApolloClient();
  const [mutation, { loading }] = useMutation<
    RemoveEntranceMutation,
    RemoveEntranceMutationVariables
  >(REMOVE_ENTRANCE, { variables: { id } });

  const remove = async () => {
    if (loading) return;

    const { data } = await mutation();
    if (data?.removeEntrance.ok) {
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

  return <div onClick={remove}>Remove</div>;
};
