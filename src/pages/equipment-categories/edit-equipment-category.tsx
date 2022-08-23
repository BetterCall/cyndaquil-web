import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { EquipmentCategoryForm } from "../../components/equipment-categories";

import {
  EDIT_EQUIPMENT_CATEGORY,
  EQUIPMENT_CATEGORY,
} from "../../queries/equipment-categories.queries";

import {
  EditEquipmentCategoryMutation,
  EditEquipmentCategoryMutationVariables,
} from "../../__generated__/EditEquipmentCategoryMutation";
import {
  EquipmentCategoryQuery,
  EquipmentCategoryQueryVariables,
} from "../../__generated__/EquipmentCategoryQuery";
import { EditEquipmentCategoryInput } from "../../__generated__/globalTypes";

type IEditEquipmentCategory = {
  id: string;
};

export const EditEquipmentCategory = () => {
  const { id } = useParams<IEditEquipmentCategory>();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/equipments");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<EditEquipmentCategoryInput>({
      mode: "all",
      defaultValues: {
        name: null,
      },
    });

  const { data } = useQuery<
    EquipmentCategoryQuery,
    EquipmentCategoryQueryVariables
  >(EQUIPMENT_CATEGORY, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.equipmentCategory?.ok && data?.equipmentCategory?.result) {
      const { result } = data?.equipmentCategory;
      setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading, error }] = useMutation<
    EditEquipmentCategoryMutation,
    EditEquipmentCategoryMutationVariables
  >(EDIT_EQUIPMENT_CATEGORY);

  const submit = async () => {
    if (loading) return;
    const input = getValues();
    console.log("input", input);

    const { data } = await mutation({
      variables: {
        id: +id!,
        input,
      },
    });

    if (data?.editEquipmentCategory.ok) {
      client.writeFragment({
        id: `EquipmentCategory:${id}`,
        fragment: gql`
          fragment EditedEquipmentCategory on EquipmentCategory {
            name
          }
        `,
        data: {
          name: input.name,
        },
      });
      navigate(`/equipments/categories`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">
        Modifier une catégorie d'équipement
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
