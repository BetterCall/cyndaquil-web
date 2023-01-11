import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { EquipmentCategoryForm } from "../components";
import { useEquipmentCategory } from "../hooks";
import { useUpdateEquipmentCategory } from "../hooks/useUpdateEquipmentCategory";

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

  const { form, submit, loading } = useUpdateEquipmentCategory({
    id: +id!,
    onCompleted: () => navigate(`/equipments/categories`),
  });

  const { data, refetch } = useEquipmentCategory(+id!);

  useEffect(() => {
    if (data?.equipmentCategory?.ok && data?.equipmentCategory?.result) {
      const { result } = data?.equipmentCategory;
      form.setValue("name", result.name);
    }
  }, [data]);

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
