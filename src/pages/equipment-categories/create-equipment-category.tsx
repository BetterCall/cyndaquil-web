import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { EquipmentCategoryForm } from "../../components/equipment-categories";

import { CREATE_EQUIPMENT_CATEGORY } from "../../queries/equipment-categories.queries";

import { CreateEquipmentCategoryInput } from "../../__generated__/globalTypes";
import {
  CreateEquipmentCategoryMutation,
  CreateEquipmentCategoryMutationVariables,
} from "../../__generated__/CreateEquipmentCategoryMutation";

export const CreateEquimentCategory = () => {
  const navigate = useNavigate();

  const form = useForm<CreateEquipmentCategoryInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateEquipmentCategoryMutation,
    CreateEquipmentCategoryMutationVariables
  >(CREATE_EQUIPMENT_CATEGORY);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const { data } = await mutation({
      variables: {
        input,
      },
    });

    if (data?.createEquipmentCategory.ok) {
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
      <EquipmentCategoryForm loading={loading} submit={submit} form={form} />
    </div>
  );
};
