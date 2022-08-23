import { useMutation } from "@apollo/client";
import React from "react";
import { DUPLICATE_ENTRANCE } from "../../queries/entrances.queries";
import {
  DuplicateEntraceMutation,
  DuplicateEntraceMutationVariables,
} from "../../__generated__/DuplicateEntraceMutation";

interface IDuplicateEntranceBtnProps {
  id: number;
  refetch: any;
}

export const DuplicateEntranceBtn: React.FC<IDuplicateEntranceBtnProps> = ({
  id,
  refetch,
}) => {
  const [mutation, { loading }] = useMutation<
    DuplicateEntraceMutation,
    DuplicateEntraceMutationVariables
  >(DUPLICATE_ENTRANCE, {
    variables: {
      entranceId: id,
    },
  });

  const duplicate = async () => {
    if (loading) return;
    const { data: mData } = await mutation({
      variables: { entranceId: id },
    });
    if (mData?.duplicateEntrance?.ok) {
      refetch();
    }
  };

  return <div onClick={duplicate}>duplicate</div>;
};
