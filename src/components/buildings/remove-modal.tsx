import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import React, { useState } from "react";
import { REMOVE_BUILDING } from "../../queries/buildings.queries";
import {
  RemoveBuildingMutation,
  RemoveBuildingMutationVariables,
} from "../../__generated__/RemoveBuildingMutation";
import { SettingsIcon } from "../icons";

interface IRemoveModalProps {
  id: number;
  siteId: number;
  refetch: any;
}

export const RemoveBuildingModal: React.FC<IRemoveModalProps> = ({
  id,
  refetch,
}) => {
  const [open, setOpen] = useState(false);

  const [mutate, { loading }] = useMutation<
    RemoveBuildingMutation,
    RemoveBuildingMutationVariables
  >(REMOVE_BUILDING, {
    variables: { id },
  });

  const submit = async () => {
    if (loading) return;

    try {
      const { data } = await mutate();
      if (data?.removeBuilding?.ok) {
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
