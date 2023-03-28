import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useEquipmentCategories } from "../hooks";

export const EquipmentCategories: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useEquipmentCategories();

  const renderList = () => {
    if (loading) return <Loading />;
    if (data?.equipmentCategories?.results?.length === 0) {
      return <EmptyList text="Aucun Type d'equipement" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className=" padding-table font-medium">Utilisateur</th>
            <th className=" padding-table font-medium text-center">
              Nb. Equipements
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.equipmentCategories?.results?.map((category, index) => (
            <tr
              key={`category-${category.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() =>
                      navigate(`/equipments/category/${category.id}`)
                    }
                  >
                    {category?.name}
                  </p>
                </div>
              </td>
              <td className="text-center padding-table  ">10 </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Header
        title={"Type d'équipements"}
        subtitle={"Liste des types d'équipements"}
        buttons={[
          {
            actionText: "Nouveaux type",
            bgColor: "indigo",
            textColor: "white",
            link: `/equipments/categories/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>
      </div>
    </>
  );
};
