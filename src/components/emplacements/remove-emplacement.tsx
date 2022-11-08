import { useMutation } from "@apollo/client";
import React from "react";
import { REMOVE_EMPLACEMENT } from "../../queries/emplacements.queries";
import {
  RemoveEmplacementMutation,
  RemoveEmplacementMutationVariables,
} from "../../__generated__/RemoveEmplacementMutation";

interface IRemoveEmplacementProps {
  emplacementId: number;
  refetch: any;
}

export const RemoveEmplacement: React.FC<IRemoveEmplacementProps> = ({
  emplacementId,
  refetch,
}) => {
  const [mutation, { loading }] = useMutation<
    RemoveEmplacementMutation,
    RemoveEmplacementMutationVariables
  >(REMOVE_EMPLACEMENT);

  const remove = async () => {
    if (loading) return;

    const { data } = await mutation({ variables: { id: emplacementId } });
    if (!data?.removeEmplacement?.ok) {
      return;
    }

    await refetch();
  };

  return (
    <span className="px-2 cursor-pointer" onClick={remove}>
      x
    </span>
  );
};
