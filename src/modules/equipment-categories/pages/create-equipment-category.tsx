import React from "react";
import { useNavigate } from "react-router-dom";

import { EquipmentCategoryForm } from "../components";
import { useCreateEquipmentCategory } from "../hooks";

export const CreateEquipmentCategory: React.FC = () => {
  const navigate = useNavigate();

  const { form, submit, loading } = useCreateEquipmentCategory({
    defaultValues: {
      name: "",
    },
    onCompleted: () =>
      navigate(`/equipments/categories`, {
        replace: true,
      }),
  });

  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">
        Nouvelle Category d'équipement
      </h4>
      <EquipmentCategoryForm loading={loading} submit={submit} form={form} />
    </div>
  );
};
