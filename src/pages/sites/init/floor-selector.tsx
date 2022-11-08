import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { UPDATE_FLOOR } from "../../../queries/floors.queries";
import {
  UpdateFloorMutation,
  UpdateFloorMutationVariables,
} from "../../../__generated__/UpdateFloorMutation";

interface IFloorSelector {
  id: number;
  name: string;
  isSelected: boolean;
  refetch: any;
}

export const FloorSelector: React.FC<IFloorSelector> = ({
  id,
  name,
  isSelected,
}) => {
  const client = useApolloClient();
  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    setIsFormOpened(false);
    form.setValue("name", name);
  }, [isSelected]);
  const form = useForm({
    defaultValues: {
      name,
    },
    mode: "all",
  });

  const [mutate, { loading }] = useMutation<
    UpdateFloorMutation,
    UpdateFloorMutationVariables
  >(UPDATE_FLOOR);

  const submit = async () => {
    if (loading) return;

    const input = form.getValues();

    try {
      const { data } = await mutate({
        variables: {
          id,
          input,
        },
      });

      if (!data?.updateFloor?.ok) {
        throw Error("Erreur lors de la requete");
      }

      client.writeFragment({
        id: `Floor:${id}`,
        fragment: gql`
          fragment FloorUpdateed on Floor {
            name
          }
        `,
        data: {
          name: input.name,
        },
      });
      setIsFormOpened(false);
    } catch (error) {
      alert(error);
    }
  };
  if (isFormOpened && isSelected) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await submit();
        }}
        className={`
        w-full
          flex flex-col p-3 cursor-pointer items-center mb-1
           justify-between
        font-medium bg-indigo-50 rounded text-indigo-500 
        `}
      >
        <input
          autoComplete="off"
          className="input w-full"
          {...form.register("name")}
        />
      </form>
    );
  }

  return (
    <div
      onDoubleClick={() => setIsFormOpened(true)}
      className={`
          flex p-3 cursor-pointer items-center mb-1
           justify-between
        ${
          isSelected
            ? "font-medium bg-indigo-50 rounded text-indigo-500"
            : " hover:bg-indigo-50 rounded text-gray-500 hover:text-indigo-500"
        }
        `}
    >
      <div className="flex">
        <span className="mr-3">
          <svg
            className="text-indigo-100"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8332 3.83333H13.9998V3C13.9998 2.33696 13.7364 1.70107 13.2676 1.23223C12.7988 0.763392 12.1629 0.5 11.4998 0.5H3.1665C2.50346 0.5 1.86758 0.763392 1.39874 1.23223C0.929896 1.70107 0.666504 2.33696 0.666504 3V3V13C0.666504 13.663 0.929896 14.2989 1.39874 14.7678C1.86758 15.2366 2.50346 15.5 3.1665 15.5H14.8332C15.4962 15.5 16.1321 15.2366 16.6009 14.7678C17.0698 14.2989 17.3332 13.663 17.3332 13V6.33333C17.3332 5.67029 17.0698 5.03441 16.6009 4.56557C16.1321 4.09673 15.4962 3.83333 14.8332 3.83333ZM3.1665 2.16667H11.4998C11.7209 2.16667 11.9328 2.25446 12.0891 2.41074C12.2454 2.56702 12.3332 2.77899 12.3332 3V3.83333H3.1665C2.94549 3.83333 2.73353 3.74554 2.57725 3.58926C2.42097 3.43298 2.33317 3.22101 2.33317 3C2.33317 2.77899 2.42097 2.56702 2.57725 2.41074C2.73353 2.25446 2.94549 2.16667 3.1665 2.16667V2.16667ZM15.6665 10.5H14.8332C14.6122 10.5 14.4002 10.4122 14.2439 10.2559C14.0876 10.0996 13.9998 9.88768 13.9998 9.66667C13.9998 9.44565 14.0876 9.23369 14.2439 9.07741C14.4002 8.92113 14.6122 8.83333 14.8332 8.83333H15.6665V10.5ZM15.6665 7.16667H14.8332C14.1701 7.16667 13.5342 7.43006 13.0654 7.8989C12.5966 8.36774 12.3332 9.00363 12.3332 9.66667C12.3332 10.3297 12.5966 10.9656 13.0654 11.4344C13.5342 11.9033 14.1701 12.1667 14.8332 12.1667H15.6665V13C15.6665 13.221 15.5787 13.433 15.4224 13.5893C15.2661 13.7455 15.0542 13.8333 14.8332 13.8333H3.1665C2.94549 13.8333 2.73353 13.7455 2.57725 13.5893C2.42097 13.433 2.33317 13.221 2.33317 13V5.35833C2.60089 5.45251 2.8827 5.50042 3.1665 5.5H14.8332C15.0542 5.5 15.2661 5.5878 15.4224 5.74408C15.5787 5.90036 15.6665 6.11232 15.6665 6.33333V7.16667Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        <span>{name}</span>
      </div>
    </div>
  );
};
