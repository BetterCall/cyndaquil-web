import React from "react";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { EquipmentCategoryForm } from "../../components/equipment-categories";

import {
  CREATE_EQUIPMENT_CATEGORY,
  EQUIPMENT_CATEGORIES,
} from "../../queries/equipment-categories.queries";

import { CreateEquipmentCategoryInput } from "../../__generated__/globalTypes";
import {
  CreateEquipmentCategoryMutation,
  CreateEquipmentCategoryMutationVariables,
} from "../../__generated__/CreateEquipmentCategoryMutation";

export const CreateEquimentCategory = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState } =
    useForm<CreateEquipmentCategoryInput>({
      mode: "all",
      defaultValues: {
        name: "",
      },
    });

  const [mutation, { loading }] = useMutation<
    CreateEquipmentCategoryMutation,
    CreateEquipmentCategoryMutationVariables
  >(CREATE_EQUIPMENT_CATEGORY);

  const submit = async () => {
    if (loading) return;
    const input = getValues();

    const { data } = await mutation({
      variables: {
        input,
      },
    });

    if (data?.createEquipmentCategory.ok) {
      const queryResult = client.readQuery({
        query: EQUIPMENT_CATEGORIES,
      });
      client.writeQuery({
        query: EQUIPMENT_CATEGORIES,
        data: {
          equipmentCategories: {
            ...queryResult.equipmentCategories,
            results: [
              {
                __typename: "EquipmentCategory",
                id: data?.createEquipmentCategory?.id,
                ...input,
              },
              ,
              ...queryResult.equipmentCategories.results,
            ],
          },
        },
      });
      navigate(`/equipments/categories`, {
        replace: true,
      });
    }
  };

  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">
        Nouvelle Category d'équipement
      </h4>
      <EquipmentCategoryForm
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
      />
    </div>
  );
};
