import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { BuildingForm } from "../../components/buildings";

import { BUILDING, EDIT_BUILDING } from "../../queries/buildings.queries";
import {
  BuildingQuery,
  BuildingQueryVariables,
} from "../../__generated__/BuildingQuery";
import {
  EditBuildingMutation,
  EditBuildingMutationVariables,
} from "../../__generated__/EditBuildingMutation";

import { EditBuildingInput } from "../../__generated__/globalTypes";

type IEditBuilding = {
  siteId: string;
  buildingId: string;
};

export const EditBuilding = () => {
  const { siteId, buildingId } = useParams<IEditBuilding>();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("buildingId", buildingId);
    if (!buildingId) {
      navigate("/");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<EditBuildingInput>({
      mode: "all",
      defaultValues: {
        name: null,
      },
    });

  const { data } = useQuery<BuildingQuery, BuildingQueryVariables>(BUILDING, {
    variables: {
      id: +buildingId!,
    },
  });

  console.log(data);

  useEffect(() => {
    if (data?.building?.ok && data?.building?.result) {
      const { result } = data?.building;
      setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    EditBuildingMutation,
    EditBuildingMutationVariables
  >(EDIT_BUILDING);

  const submit = async () => {
    if (loading) return;
    const input = getValues();

    const { data } = await mutation({
      variables: {
        id: +buildingId!,
        input,
      },
    });

    if (data?.editBuilding.ok) {
      client.writeFragment({
        id: `Building:${buildingId}`,
        fragment: gql`
          fragment EditedBuilding on Building {
            name
          }
        `,
        data: {
          name: input.name,
        },
      });
      navigate(`/sites/${siteId}`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">Edit Building</h4>
      <BuildingForm
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
      />
    </div>
  );
};
