import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import { BuildingForm } from "../../components/buildings";

import { CREATE_BUILDING } from "../../queries/buildings.queries";
import { SITE } from "../../queries/sites.queries";

import {
  CreateBuildingMutation,
  CreateBuildingMutationVariables,
} from "../../__generated__/CreateBuildingMutation";
import { CreateBuildingInput } from "../../__generated__/globalTypes";

export const CreateBuilding = ({ id }: any) => {
  const client = useApolloClient();
  const form = useForm<CreateBuildingInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateBuildingMutation,
    CreateBuildingMutationVariables
  >(CREATE_BUILDING);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const { data } = await mutation({
      variables: {
        input: {
          ...input,
          siteId: +id!,
        },
      },
    });

    if (data?.createBuilding.ok) {
      const queryResult = client.readQuery({
        query: SITE,
        variables: { id: +id! },
      });
      client.writeQuery({
        query: SITE,
        variables: {
          id: +id!,
        },
        data: {
          site: {
            ...queryResult.site,
            result: {
              ...queryResult?.site?.result,
              buildings: [
                {
                  __typename: "Building",
                  id: data?.createBuilding?.id,
                  name: input.name,
                },
                ...queryResult?.site?.result?.buildings,
              ],
            },
          },
        },
      });

      form.setValue("name", "");
    }
  };

  return (
    <div className="w-full">
      <BuildingForm loading={loading} form={form} submit={submit} />
    </div>
  );
};
