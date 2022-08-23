import { useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { EntranceForm } from "../../components/entrances";
import { BUILDING } from "../../queries/buildings.queries";

import { CREATE_ENTRANCE } from "../../queries/entrances.queries";

import {
  CreateEntranceMutation,
  CreateEntranceMutationVariables,
} from "../../__generated__/CreateEntranceMutation";
import { CreateEntranceInput } from "../../__generated__/globalTypes";

type ICreateEntranceParams = {
  buildingId: string;
  siteId: string;
};

export const CreateEntrance = () => {
  const client = useApolloClient();
  const { buildingId, siteId } = useParams<ICreateEntranceParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!buildingId) {
      navigate("/sites");
    }
  }, []);

  const [mutation, { loading }] = useMutation<
    CreateEntranceMutation,
    CreateEntranceMutationVariables
  >(CREATE_ENTRANCE);

  const { register, handleSubmit, getValues, formState } =
    useForm<CreateEntranceInput>({
      mode: "all",
      defaultValues: {
        name: "",
        buildingId: +buildingId!,
        stagesCount: 1,
        basementsCount: 0,
      },
    });

  const submit = async () => {
    if (loading) return;
    const { name, stagesCount, basementsCount } = getValues();

    const { data } = await mutation({
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
      navigate(`/sites/${siteId}/buildings/${buildingId}`, {
        replace: true,
      });
    }
  };

  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">Nouveau Client</h4>
      <EntranceForm
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
      />
    </div>
  );
};
