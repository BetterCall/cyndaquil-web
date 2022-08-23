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

type ICreateBuildingParams = {
  id: string;
};

export const CreateBuilding = () => {
  const client = useApolloClient();
  const { id } = useParams<ICreateBuildingParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<CreateBuildingInput>({
      mode: "all",
      defaultValues: {
        name: "",
      },
    });

  const [mutation, { loading }] = useMutation<
    CreateBuildingMutation,
    CreateBuildingMutationVariables
  >(CREATE_BUILDING);

  const submit = async () => {
    if (loading) return;
    const input = getValues();

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
      console.log("query result ", queryResult);
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
      navigate(`/sites/${id}`, {
        replace: true,
      });
    }
  };

  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">Nouveau Bâtiment</h4>
      <BuildingForm
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
      />
    </div>
  );
};
