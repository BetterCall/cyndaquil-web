import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import React, { useState } from "react";
import { REMOVE_FLOOR } from "../../queries/floors.queries";
import {
  RemoveFloorMutation,
  RemoveFloorMutationVariables,
} from "../../__generated__/RemoveFloorMutation";
import { SettingsIcon } from "../icons";

interface IRemoveModalProps {
  id: number;
  refetch: any;
}

export const RemoveFloorModal: React.FC<IRemoveModalProps> = ({
  id,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const [mutate, { loading }] = useMutation<
    RemoveFloorMutation,
    RemoveFloorMutationVariables
  >(REMOVE_FLOOR, {
    variables: { id },
  });

  const submit = async () => {
    if (loading) return;

    try {
      const { data } = await mutate();
      if (data?.removeFloor?.ok) {
        await refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <SettingsIcon />
      </div>

      <Modal
        title="Suppression"
        visible={open}
        onOk={() => submit()}
        onCancel={() => setOpen(false)}
        okText="Supprimer"
        cancelText="Annuler"
      >
        <p>Attention toute suppression sera définitive</p>
      </Modal>
    </>
  );
};
