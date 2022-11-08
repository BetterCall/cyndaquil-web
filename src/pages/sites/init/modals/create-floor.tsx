import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FloorForm } from "../../../../components/floors";
import { CREATE_FLOOR } from "../../../../queries/floors.queries";
import {
  CreateFloorMutation,
  CreateFloorMutationVariables,
} from "../../../../__generated__/CreateFloorMutation";
import { CreateFloorInput } from "../../../../__generated__/globalTypes";

interface ICreateFloorModal {
  entranceId: number;
  refetch: any;
}

export const CreateFloorModal: React.FC<ICreateFloorModal> = ({
  entranceId,
  refetch,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [mutate, { loading }] = useMutation<
    CreateFloorMutation,
    CreateFloorMutationVariables
  >(CREATE_FLOOR);

  const form = useForm<CreateFloorInput>({
    defaultValues: {
      entranceId,
    },
    mode: "all",
  });

  const submit = async () => {
    try {
      const input = form.getValues();
      console.log(input);
      const { data, errors } = await mutate({
        variables: {
          input,
        },
      });

      console.log(errors);
      if (data?.createFloor.ok) {
        await refetch();
        form.setValue("name", "");
        setIsOpened(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <a
        onClick={() => setIsOpened(true)}
        className="inline-flex items-center w-1/3 shadow py-2 px-3 text-xs text-indigo-500 font-medium bg-white hover:bg-indigo-50 rounded"
      >
        <span className="inline-block mr-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 9.33334C13.6 9.33334 13.3333 9.60001 13.3333 10V12.6667C13.3333 13.0667 13.0667 13.3333 12.6667 13.3333H3.33334C2.93334 13.3333 2.66668 13.0667 2.66668 12.6667V10C2.66668 9.60001 2.40001 9.33334 2.00001 9.33334C1.60001 9.33334 1.33334 9.60001 1.33334 10V12.6667C1.33334 13.8 2.20001 14.6667 3.33334 14.6667H12.6667C13.8 14.6667 14.6667 13.8 14.6667 12.6667V10C14.6667 9.60001 14.4 9.33334 14 9.33334ZM5.80001 5.13334L7.33334 3.60001V10C7.33334 10.4 7.60001 10.6667 8.00001 10.6667C8.40001 10.6667 8.66668 10.4 8.66668 10V3.60001L10.2 5.13334C10.4667 5.40001 10.8667 5.40001 11.1333 5.13334C11.4 4.86668 11.4 4.46668 11.1333 4.20001L8.46668 1.53334C8.20001 1.26668 7.80001 1.26668 7.53334 1.53334L4.86668 4.20001C4.60001 4.46668 4.60001 4.86668 4.86668 5.13334C5.13334 5.40001 5.53334 5.40001 5.80001 5.13334Z"
              fill="#8880EB"
            ></path>
          </svg>
        </span>
        <span>Ajouter</span>
      </a>
      <Modal
        title="Nouveau Batiment"
        visible={isOpened}
        onCancel={() => setIsOpened(false)}
        onOk={() => setIsOpened(false)}
        style={{
          width: "90%",
        }}
        footer={null}
      >
        <FloorForm form={form} submit={submit} loading={loading} />
      </Modal>
    </>
  );
};
