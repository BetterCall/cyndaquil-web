import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";

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
    <>
      <Header
        title="Type d'équipement"
        subtitle="Nouveau type d'équipement"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/emplacements",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <EquipmentCategoryForm
            loading={loading}
            submit={submit}
            form={form}
          />
        </div>
      </div>
    </>
  );
};
