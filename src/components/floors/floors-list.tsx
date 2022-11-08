import React from "react";
import { useMutation } from "@apollo/client";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";

import { REORDER_FLOORS } from "../../queries/floors.queries";

import {
  ReorderFloorsMutation,
  ReorderFloorsMutationVariables,
} from "../../__generated__/ReorderFloorsMutation";

interface IFloorsProps {
  floors: any[];
  entranceId: number;
  refetch: any;
  select: any;
  children;
}

export const FloorsList: React.FC<IFloorsProps> = ({
  floors,
  entranceId,
  refetch,
  select,
  children,
}) => {
  const [mutation] = useMutation<
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
    await refetch();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="0">{children}</Droppable>
    </DragDropContext>
  );
};
