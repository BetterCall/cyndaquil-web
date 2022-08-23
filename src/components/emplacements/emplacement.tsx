import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { DELETE_EMPLACEMENT } from "../../queries/emplacements.queries";
import {
  DeleteEmplacementMutation,
  DeleteEmplacementMutationVariables,
} from "../../__generated__/DeleteEmplacementMutation";

interface IEmplacementProps {
  floorId: number;
  emplacementId: number;
  categoryName: string;
}

export const Emplacement: React.FC<IEmplacementProps> = ({
  floorId,
  emplacementId,
  categoryName,
}) => {
  const client = useApolloClient();
  const [mutation, { loading }] = useMutation<
    DeleteEmplacementMutation,
    DeleteEmplacementMutationVariables
  >(DELETE_EMPLACEMENT);

  const remove = async () => {
    if (loading) return;

    const { data } = await mutation({ variables: { id: emplacementId } });
    if (!data?.deleteEmplacement?.ok) {
      return;
    }

    const floor = client.readFragment({
      id: `Floor:${floorId}`, // The value of the to-do item's cache ID
      fragment: gql`
        fragment MyFloor${floorId} on Floor {
          id
          name
          emplacements {
            id
          }
        }
      `,
    });

    console.log(floor);
    console.log(floor.emplacements.filter((e: any) => e.id !== emplacementId));

    client.writeFragment({
      id: `Floor:${floorId}`,
      fragment: gql`
        fragment MyFloor${floorId}Edited on Floor {
          emplacements {
              id
          }
        }
      `,
      data: {
        emplacements: floor.emplacements.filter(
          (e: any) => e.id !== emplacementId
        ),
      },
    });
  };

  return (
    <div className="flex justify-between">
      <span>{categoryName}</span>{" "}
      <span className="px-2 cursor-pointer" onClick={remove}>
        x
      </span>
    </div>
  );
};
