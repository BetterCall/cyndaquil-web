import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { EquipmentCategoryForm } from "../../components/equipment-categories";

import {
  UPDATE_EQUIPMENT_CATEGORY,
  EQUIPMENT_CATEGORY,
} from "../../queries/equipment-categories.queries";

import {
  UpdateEquipmentCategoryMutation,
  UpdateEquipmentCategoryMutationVariables,
} from "../../__generated__/UpdateEquipmentCategoryMutation";
import {
  EquipmentCategoryQuery,
  EquipmentCategoryQueryVariables,
} from "../../__generated__/EquipmentCategoryQuery";
import { UpdateEquipmentCategoryInput } from "../../__generated__/globalTypes";

type IUpdateEquipmentCategory = {
  id: string;
};

export const UpdateEquipmentCategory = () => {
  const { id } = useParams<IUpdateEquipmentCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/equipments");
    }
  }, []);

  const form = useForm<UpdateEquipmentCategoryInput>({
    mode: "all",
  });

  const { data, refetch } = useQuery<
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
      form.setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading, error }] = useMutation<
    UpdateEquipmentCategoryMutation,
    UpdateEquipmentCategoryMutationVariables
  >(UPDATE_EQUIPMENT_CATEGORY);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();
    const { data } = await mutation({
      variables: {
        id: +id!,
        input,
      },
    });

    if (data?.updateEquipmentCategory?.ok) {
      await refetch();
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
      <EquipmentCategoryForm loading={loading} submit={submit} form={form} />
    </div>
  );
};
