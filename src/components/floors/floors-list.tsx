import React from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import { CreateEmplacement, Emplacement } from "../emplacements";

import { FLOORS, REORDER_FLOORS } from "../../queries/floors.queries";

import { FloorsQuery_floors_results } from "../../__generated__/FloorsQuery";
import {
  ReorderFloorsMutation,
  ReorderFloorsMutationVariables,
} from "../../__generated__/ReorderFloorsMutation";

interface IFloorsProps {
  floors: FloorsQuery_floors_results[];
  entranceId: number;
}

export const FloorsList: React.FC<IFloorsProps> = ({ floors, entranceId }) => {
  const client = useApolloClient();

  const [mutation, { loading }] = useMutation<
    ReorderFloorsMutation,
    ReorderFloorsMutationVariables
  >(REORDER_FLOORS);

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result = result.map((r: any, index) => ({ ...r, order: index }));
    return result;
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const results = reorder(
      floors,
      result.source.index,
      result.destination.index
    );

    const floorsOrdered = results.map((r: any) => ({
      id: r.id,
      order: r.order,
    }));
    const { data } = await mutation({
      variables: {
        floors: floorsOrdered,
      },
    });

    if (!data?.reorderFloors?.ok) {
      return;
    }

    const queryResult = client.readQuery({
      query: FLOORS,
      variables: { entranceId },
    });

    client.writeQuery({
      query: FLOORS,
      variables: {
        entranceId,
      },
      data: {
        floors: {
          ...queryResult.floors,
          results: [...results],
        },
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="0">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {floors?.map((stage, index) => (
              <Draggable
                key={`stage-${stage.id}`}
                draggableId={stage.id + ""}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className="px-6 py-4  border-b"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="text-sm text-gray-900 font-bold whitespace-nowrap">
                      {stage.name}
                    </div>
                    <div className="text-sm text-gray-900 font-bold whitespace-nowrap">
                      {stage.emplacements?.map((emplacement) => (
                        <Emplacement
                          floorId={stage.id}
                          emplacementId={emplacement.id}
                          categoryName={emplacement.category?.name || ""}
                        />
                      ))}
                    </div>
                    <div className="mt-5 font-light">
                      Ajouter un emplacement :
                    </div>
                    <CreateEmplacement
                      type={stage.type}
                      entranceId={entranceId}
                      floorId={stage.id}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
