import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { BuildingForm } from "../../components/buildings";

import { BUILDING, UPDATE_BUILDING } from "../../queries/buildings.queries";
import {
  BuildingQuery,
  BuildingQueryVariables,
} from "../../__generated__/BuildingQuery";
import {
  UpdateBuildingMutation,
  UpdateBuildingMutationVariables,
} from "../../__generated__/UpdateBuildingMutation";

import { UpdateBuildingInput } from "../../__generated__/globalTypes";

type IUpdateBuilding = {
  siteId: string;
  buildingId: string;
};

export const UpdateBuilding = () => {
  const { siteId, buildingId } = useParams<IUpdateBuilding>();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (!buildingId) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateBuildingInput>({
    mode: "all",
  });

  const { data } = useQuery<BuildingQuery, BuildingQueryVariables>(BUILDING, {
    variables: {
      id: +buildingId!,
    },
  });

  useEffect(() => {
    if (data?.building?.ok && data?.building?.result) {
      const { result } = data?.building;
      form.setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateBuildingMutation,
    UpdateBuildingMutationVariables
  >(UPDATE_BUILDING);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +buildingId!,
        input,
      },
    });

    if (data?.updateBuilding.ok) {
      client.writeFragment({
        id: `Building:${buildingId}`,
        fragment: gql`
          fragment UpdateedBuilding on Building {
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
      <h4 className="font-semibold text-2xl mb-3">Update Building</h4>
      <BuildingForm loading={loading} submit={submit} form={form} />
    </div>
  );
};
