import { useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EntranceForm } from "../../../components/entrances";
import { BUILDING } from "../../../queries/buildings.queries";
import { CREATE_ENTRANCE } from "../../../queries/entrances.queries";
import {
  CreateEntranceMutation,
  CreateEntranceMutationVariables,
} from "../../../__generated__/CreateEntranceMutation";
import { CreateEntranceInput } from "../../../__generated__/globalTypes";

interface INewEntranceProps {
  buildingId: number;
}

export const NewEntrance: React.FC<INewEntranceProps> = ({ buildingId }) => {
  const client = useApolloClient();
  const form = useForm<CreateEntranceInput>({
    defaultValues: {
      buildingId,
    },
    mode: "all",
  });

  const [isFormOpened, setIsOpened] = useState(false);

  const [mutate, { loading }] = useMutation<
    CreateEntranceMutation,
    CreateEntranceMutationVariables
  >(CREATE_ENTRANCE);

  const submit = async () => {
    if (loading) return;
    const { name, stagesCount, basementsCount } = form.getValues();

    const { data } = await mutate({
      variables: {
        input: {
          name,
          buildingId: +buildingId!,
          stagesCount: +stagesCount!,
          basementsCount: +basementsCount!,
        },
      },
    });

    if (data?.createEntrance.ok) {
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
                { __typename: "Entrance", id: data?.createEntrance?.id, name },
                ...queryResult.building.result.entrances,
              ],
            },
          },
        },
      });

      setIsOpened(false);
      form.setValue("name", "");
      form.setValue("basementsCount", 0);
      form.setValue("stagesCount", 0);
    }
  };

  return (
    <div className="py-5 px-6 mb-3 bg-white shadow rounded">
      <button
        className="w-full flex justify-between items-center"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <h3 className="text-sm font-bold">Ajouter un entrée</h3>
        <span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.08317 0.666657C8.74984 0.333323 8.24984 0.333323 7.91651 0.666657L4.99984 3.58332L2.08317 0.666657C1.74984 0.333323 1.24984 0.333323 0.916504 0.666657C0.583171 0.99999 0.583171 1.49999 0.916504 1.83332L4.41651 5.33332C4.58317 5.49999 4.74984 5.58332 4.99984 5.58332C5.24984 5.58332 5.4165 5.49999 5.58317 5.33332L9.08317 1.83332C9.41651 1.49999 9.41651 0.99999 9.08317 0.666657Z"
              fill="#8594A5"
            ></path>
          </svg>
        </span>
      </button>
      <p
        className={`${
          isFormOpened ? "" : "hidden"
        }  mt-3 pr-6 text-sm text-gray-500`}
      >
        <EntranceForm loading={loading} form={form} submit={submit} />
      </p>
    </div>
  );
};
